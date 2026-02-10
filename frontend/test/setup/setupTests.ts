// Global test setup for Vitest (jsdom)
// Keep this file minimal to avoid leaking state across tests.
import { afterEach, vi } from 'vitest'

// Ensure mocks are reset between tests to keep tests isolated (SoC) and DRY.
afterEach(() => {
  vi.restoreAllMocks()
})

// Example: define minimal matchMedia to avoid crashes if components query it.
if (typeof window !== 'undefined' && !('matchMedia' in window)) {
  // @ts-expect-error - we are adding a minimal stub for tests
  window.matchMedia = () => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}
