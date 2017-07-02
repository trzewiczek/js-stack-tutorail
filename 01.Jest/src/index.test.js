/* globals describe it expect */
import { pureFunction, asyncFunction } from './index'

describe('01. Jest', () => {
  it('should cut & reverse a list', () => {
    const aList = [ 4, 3, 2, 1 ]
    const expected = [ 1, 2, 3 ]

    const result = pureFunction(aList)

    expect(result).toEqual(expected)
  })

  it('should resolve to DONE', () => {
    const returnedPromise = asyncFunction(1000)

    expect(returnedPromise).resolves.toBe('DONE')
  })
})
