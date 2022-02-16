import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import requireAuth from './requireAuth'

describe('requireAuth directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(requireAuth.schema).toBeTruthy()
    expect(getDirectiveName(requireAuth.schema)).toBe('requireAuth')
  })

  it('requireAuth has stub implementation. Should not throw when current user', () => {
    // If you want to set values in context, pass it through e.g.
    const context = { currentUser: { id: 'abc', username: 'boby' } }
    const mockExecution = mockRedwoodDirective(requireAuth, { context })

    expect(mockExecution).not.toThrowError()
  })
})
