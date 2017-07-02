import { pureFunction, asyncFunction } from './index'

describe('01. Jest', () => {
  it('should cut & reverse a list', () => {
    const aList = [ 4, 3, 2, 1 ]
    const expected = [ 1, 2, 3 ]

    const result = pureFunction(aList)

    expect(result).toEqual(expected)
  })

  it('should resolve to DONE', () => {
    const resolutionDelay = 8 * 1000
    const returnedPromise = asyncFunction(resolutionDelay)

    expect(returnedPromise).resolves.toBe('DONE')
  })
})
