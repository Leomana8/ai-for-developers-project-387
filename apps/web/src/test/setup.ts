import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

import { installApiMock, resetApiMock } from './mockApi'

// Stub fetch/Request ставится до загрузки тестовых файлов: клиент openapi-fetch
// (@/lib/api) захватывает глобальные fetch/Request при создании.
installApiMock()

// jsdom не умеет то, на чём держится Radix Select (см. Select в
// src/components/ui/select.tsx): измерение триггера, прокрутка списка и захват
// указателя. Без заглушек раскрытый список не появляется — и достать его варианты
// в тестах нельзя.
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Element.prototype.scrollIntoView ??= () => {}
Element.prototype.hasPointerCapture ??= () => false
Element.prototype.releasePointerCapture ??= () => {}

afterEach(() => {
  cleanup()
  resetApiMock()
})
