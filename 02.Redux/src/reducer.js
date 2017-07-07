import { ADD_TRAVEL, REMOVE_TRAVEL, RESCHEDULE_TRAVEL } from './actionTypes'

/**
 * Travel reducer.
 *
 * Supported action types:
 *  - ADD_TRAVEL
 *  - REMOVE_TRAVEL
 *  - RESCHEDULE_TRAVEL
 *
 * @param {Object} [state = { travels: [] }] Current state of the store
 * @param {Object} action Action dispatched by the store
 * @return {Object} New state of the store
 */
export const reducer = (state = { travels: [] }, action) => {
  switch (action.type) {
    case ADD_TRAVEL:
      const { id, destination, date } = action
      return {
        travels: [
          ...state.travels,
          {
            id,
            destination,
            date
          }
        ]
      }
    case REMOVE_TRAVEL:
      return {
        travels: state.travels.filter(e => e.id !== action.id)
      }
    case RESCHEDULE_TRAVEL:
      return {
        travels: state.travels.map(e => {
          if (e.id !== action.id) {
            return e
          } else {
            return Object.assign({}, e, { date: action.date })
          }
        })
      }
    default:
      return state
  }
}
