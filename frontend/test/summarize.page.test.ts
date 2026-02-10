import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import SummarizePage from '../src/pages/SummarizePage.vue'

function mockFetchOk(summaryText: string) {
  return vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ summary: summaryText }),
  } as Response)
}

function mockFetchFail(status = 500, body: any = { message: 'Server error' }) {
  return vi.fn().mockResolvedValue({
    ok: false,
    status,
    json: async () => body,
  } as Response)
}

describe('SummarizePage.vue', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('disables submit button when textarea is empty and enables when filled', async () => {
    const wrapper = mount(SummarizePage)

    const button = wrapper.get('button')
    expect((button.element as HTMLButtonElement).disabled).toBe(true)

    const textarea = wrapper.get('textarea#transcript')
    await textarea.setValue('Some transcript text')

    expect((button.element as HTMLButtonElement).disabled).toBe(false)
  })

  it('calls /summarize and renders the returned summary', async () => {
    const fetchSpy = (globalThis as any).fetch = mockFetchOk('This is a summary.')

    const wrapper = mount(SummarizePage)

    await wrapper.get('textarea#transcript').setValue('Patient presents with...')

    const button = wrapper.get('button')
    await button.trigger('click')

    // Wait for promises to resolve
    await wrapper.vm.$nextTick()

    expect(fetchSpy).toHaveBeenCalledTimes(1)
    expect(fetchSpy).toHaveBeenCalledWith('/summarize', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }))

    expect(wrapper.text()).toContain('This is a summary.')
  })

  it('shows an error message on failed request and clears loading state', async () => {
    (globalThis as any).fetch = mockFetchFail(500, { message: 'Boom' })

    const wrapper = mount(SummarizePage)

    await wrapper.get('textarea#transcript').setValue('Some text')
    await wrapper.get('button').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Boom')

    // button should not be loading / disabled anymore
    const button = wrapper.get('button')
    expect((button.element as HTMLButtonElement).disabled).toBe(false)
  })
})
