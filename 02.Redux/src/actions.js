import { ADD_TRAVEL, REMOVE_TRAVEL, RESCHEDULE_TRAVEL } from './actionTypes'

export const addTravel = (id, destination, date) => ({
  type: ADD_TRAVEL,
  id,
  destination,
  date
})

export const removeTravel = (id) => ({
  type: REMOVE_TRAVEL,
  id
})

export const rescheduleTravel = (id, date) => ({
  type: RESCHEDULE_TRAVEL,
  id,
  date
})
