import { describe, it, expect } from 'vitest'
import { render } from '../utils/render'
import App from '../../src/App.vue'

describe('App root', () => {
  it('mounts successfully', () => {
    const wrapper = render(App)
    expect(wrapper.exists()).toBe(true)
  })
})
