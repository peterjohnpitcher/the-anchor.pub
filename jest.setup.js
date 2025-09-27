// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import './lib/test-utils/matchers'
import nodeFetch, { Headers as NodeFetchHeaders, Request as NodeFetchRequest, Response as NodeFetchResponse } from 'next/dist/compiled/node-fetch'

if (!global.fetch) {
  global.fetch = nodeFetch
}

if (!global.Request) {
  global.Request = NodeFetchRequest
}

if (!global.Response) {
  global.Response = NodeFetchResponse
}

if (!global.Headers) {
  global.Headers = NodeFetchHeaders
}

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock scrollTo
window.scrollTo = jest.fn()

// Mock console methods in tests to reduce noise
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
