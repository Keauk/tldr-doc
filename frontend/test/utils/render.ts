import { mount, type VueWrapper, type MountingOptions } from '@vue/test-utils'
import { h, type Component } from 'vue'

// A tiny render helper to keep tests DRY and encapsulate common globals/stubs.
export function render<T extends Component>(
  component: T,
  options: MountingOptions<any> = {}
): VueWrapper<any> {
  return mount(component as any, {
    // Add common global config here if/when needed (plugins, stubs, mocks)
    global: {
      stubs: {
        // Keep DOM depth shallow for speed unless interaction requires child
        // components; add stubs here as project grows.
      },
      ...(options.global ?? {}),
    },
    ...options,
  })
}

// Convenience query helpers (optional and minimal to avoid test bloat):
export const byLabel = (wrapper: VueWrapper, labelText: string) => {
  const label = wrapper.findAll('label').find(l => l.text() === labelText)
  if (!label) return null
  const forId = (label.attributes('for') || '').trim()
  // Avoid using CSS.escape (not available in jsdom by default). Use an attribute selector.
  return forId ? wrapper.find(`[id="${forId}"]`) : null
}
