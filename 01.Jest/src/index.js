/**
 * @example <caption>Input/Output data example</caption>
 * // input
 * [ 4, 3, 2, 1 ]
 * // output
 * [ 1, 2, 3 ]
 *
 * @example <caption>Input/Output data example</caption>
 * // input
 * [ { value: 'c' }, { value: 'b' }, { value: 'a' } ]
 * // output
 * [ { value: 'a' }, { value: 'b' } ]
 *
 * @param {Array<T>} list list of objects of type T
 * @return {Array<T>} shorten and reversed list of objects of type T
 */
export const pureFunction = (list) => {
  return list.slice(1).reverse()
}

/**
 * @example <caption>asyncFunction in action</caption>
 * const promise = asyncFunction(1000)
 * promise.then(action => dispatch({ type: action }))
 *
 * @param {number} timeout Time of the promise resolution delay
 * @return {Promise<string>} Promise resolves to a string 'DONE'
 */
export const asyncFunction = (timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve('DONE'), timeout)
  })
}
