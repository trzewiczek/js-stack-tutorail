import { ADD_TRAVEL, REMOVE_TRAVEL, RESCHEDULE_TRAVEL } from './actionTypes'
import { addTravel, removeTravel, rescheduleTravel } from './actions'

describe('Action creators', () => {
  it('should create an ADD_TRAVEL action', () => {
    const expectedAction = {
      type: ADD_TRAVEL,
      id: 0,
      destination: 'Mar-A-Lago, FL',
      date: '2017-12-13'
    }

    const result = addTravel(0, 'Mar-A-Lago, FL', '2017-12-13')

    expect(result).toEqual(expectedAction)
  })

  it('should create a REMOVE_TRAVEL action', () => {
    const expectedAction = {
      type: REMOVE_TRAVEL,
      id: 0
    }

    const result = removeTravel(0)

    expect(result).toEqual(expectedAction)
  })

  it('should create a RESCHEDULE_TRAVEL action', () => {
    const expectedAction = {
      type: RESCHEDULE_TRAVEL,
      id: 0,
      date: '2017-12-06'
    }

    const result = rescheduleTravel(0, '2017-12-06')

    expect(result).toEqual(expectedAction)
  })
})
