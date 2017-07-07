import { ADD_TRAVEL, REMOVE_TRAVEL, RESCHEDULE_TRAVEL } from './actionTypes'

/**
 * Action creator for ADD_TRAVEL action type
 *
 * @param {number} id ID number of a travel to be added
 * @param {string} destination Name of the travel description
 * @param {string} date Date of the travel following format RRRR-MM-DD
 * @return {Object} ADD_TRAVEL action
 */
export const addTravel = (id, destination, date) => ({
  type: ADD_TRAVEL,
  id,
  destination,
  date
})

/**
 * Action creator for REMOVE_TRAVEL action type
 *
 * @param {number} id ID number of a travel to be removed
 * @return {Object} REMOVE_TRAVEL action
 */
export const removeTravel = (id) => ({
  type: REMOVE_TRAVEL,
  id
})

/**
 * Action creator for RESCHEDULE_TRAVEL action type
 *
 * @param {number} id ID number of a travel to be rescheduled
 * @param {string} date Date of the travel following format RRRR-MM-DD
 * @return {Object} ADD_TRAVEL action
 */
export const rescheduleTravel = (id, date) => ({
  type: RESCHEDULE_TRAVEL,
  id,
  date
})
