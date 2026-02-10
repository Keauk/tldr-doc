import { describe, it, expect } from 'vitest'
import { render, byLabel } from '../utils/render'
import TranscriptInput from '../../src/components/TranscriptInput.vue'

describe('TranscriptInput', () => {
  it('renders label and textarea with default attributes', () => {
    const wrapper = render(TranscriptInput, { props: { modelValue: '' } })
    const textarea = byLabel(wrapper, 'Transcript')
    expect(textarea).not.toBeNull()
    expect(textarea!.attributes('id')).toBe('transcript')
    expect(textarea!.attributes('placeholder')).toBe('Paste transcript here...')
  })

  it('supports v-model: updates value and emits update', async () => {
    const wrapper = render(TranscriptInput, { props: { modelValue: '' } })
    const textarea = wrapper.get('textarea')

    await textarea.setValue('New text')

    const events = wrapper.emitted('update:modelValue')
    expect(events).toBeTruthy()
    expect(events![0]).toEqual(['New text'])
  })

  it('respects disabled, aria-busy, and custom placeholder', () => {
    const wrapper = render(TranscriptInput, {
      props: { modelValue: '', disabled: true, ariaBusy: true, placeholder: 'Type here' },
    })
    const textarea = wrapper.get('textarea')
    const el = textarea.element as HTMLTextAreaElement
    expect(el.disabled).toBe(true)
    expect(textarea.attributes('aria-busy')).toBe('true')
    expect(textarea.attributes('placeholder')).toBe('Type here')
  })
})
