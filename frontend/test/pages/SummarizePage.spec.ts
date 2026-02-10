import { describe, it, expect, vi } from 'vitest'
import { render } from '../utils/render'
import SummarizePage from '../../src/pages/SummarizePage.vue'

// Mock the summarize service to keep page tests focused on UI flow (SoC)
vi.mock('../../src/services/summarizeApi', () => ({
  summarize: vi.fn(),
}))

import { summarize } from '../../src/services/summarizeApi'

function getButton(wrapper: any) {
  return wrapper.get('button')
}

function getTextarea(wrapper: any) {
  return wrapper.get('textarea#transcript')
}

describe('SummarizePage', () => {
  it('disables submit when text is empty and enables after input', async () => {
    const wrapper = render(SummarizePage)
    const button = getButton(wrapper)
    expect((button.element as HTMLButtonElement).disabled).toBe(true)

    await getTextarea(wrapper).setValue('Some transcript text')
    expect((button.element as HTMLButtonElement).disabled).toBe(false)
  })

  it('submits using summarize service and shows summary', async () => {
    ;(summarize as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce('This is a summary.')

    const wrapper = render(SummarizePage)
    await getTextarea(wrapper).setValue('Patient presents with...')
    await getButton(wrapper).trigger('click')

    // allow promises to resolve
    await wrapper.vm.$nextTick()

    expect(summarize).toHaveBeenCalledWith('Patient presents with...', 'en')
    expect(wrapper.text()).toContain('This is a summary.')
  })

  it('shows an error message if summarize throws and re-enables button', async () => {
    ;(summarize as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Boom'))

    const wrapper = render(SummarizePage)
    await getTextarea(wrapper).setValue('Some text')
    await getButton(wrapper).trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Boom')

    const button = getButton(wrapper)
    expect((button.element as HTMLButtonElement).disabled).toBe(false)
  })
})
