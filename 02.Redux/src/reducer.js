import { ADD_TRAVEL, REMOVE_TRAVEL, RESCHEDULE_TRAVEL } from './actionTypes'

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
            return {
              id: e.id,
              destination: e.destination,
              date: action.date
            }
          }
        })
      }
    default:
      return state
  }
}
