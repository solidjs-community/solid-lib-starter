import { createRoot } from 'solid-js'
import { describe, expect, it } from 'vitest'
import { Hello } from '../src'

describe('Hello', () => {
  it('should render', () => {
    createRoot(() => {
      const el = (<Hello />) as HTMLElement
      expect(el.innerHTML).toContain('Hello')
    })
  })
})
