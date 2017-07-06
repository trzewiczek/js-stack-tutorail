/**
 * A Todo reducer.
 *
 * Supported action types:
 *  - ADD_TODO
 *
 * @param {Object} [state = { todos: [] }] Current state of the store
 * @param {Object} action Dispatched action
 * @return {Object} New state if the store
 */
export const reducer = (state = { todos: [] }, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [
          ...state.todos,
          action.text
        ]
      }
    default:
      return state
  }
}
