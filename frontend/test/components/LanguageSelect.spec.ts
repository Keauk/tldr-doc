import { describe, it, expect } from 'vitest'
import { render, byLabel } from '../utils/render'
import LanguageSelect from '../../src/components/LanguageSelect.vue'

describe('LanguageSelect', () => {
  it('renders label and select with default id', () => {
    const wrapper = render(LanguageSelect, { props: { modelValue: 'en' } })
    const select = byLabel(wrapper, 'Language')
    expect(select).not.toBeNull()
    expect(select!.attributes('id')).toBe('language')
    expect((select!.element as HTMLSelectElement).value).toBe('en')
  })

  it('emits update when selection changes via v-model', async () => {
    const wrapper = render(LanguageSelect, { props: { modelValue: 'fi' } })
    const select = wrapper.get('select')

    await select.setValue('sv')

    // v-model should emit update
    const events = wrapper.emitted('update:modelValue')
    expect(events).toBeTruthy()
    expect(events![0]).toEqual(['sv'])
  })

  it('respects disabled prop', () => {
    const wrapper = render(LanguageSelect, { props: { modelValue: 'en', disabled: true } })
    const select = wrapper.get('select')
    expect((select.element as HTMLSelectElement).disabled).toBe(true)
  })

  it('contains expected language options', () => {
    const wrapper = render(LanguageSelect, { props: { modelValue: 'en' } })
    const options = wrapper.findAll('option').map(o => ({ value: o.attributes('value'), text: o.text() }))
    expect(options).toEqual([
      { value: 'en', text: 'English' },
      { value: 'fi', text: 'Finnish' },
      { value: 'nl', text: 'Dutch' },
      { value: 'sv', text: 'Swedish' },
    ])
  })
})
