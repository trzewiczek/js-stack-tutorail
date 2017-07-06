import { reducer } from './reducer'

import { addTravel, removeTravel, rescheduleTravel } from './actions'

describe('Action creators', () => {
  it('should initialize the store', () => {
    const initialState = undefined
    const dummyAction = { type: 'DUMMY_ACTION' }

    const expectedState = { travels: [] }

    const newState = reducer(initialState, dummyAction)

    expect(newState).toEqual(expectedState)
  })

  it('should add travel to the end of travel list', () => {
    const initialState = {
      travels: [
        {
          id: 0,
          destination: 'Taranaki, NZ',
          date: '2017-09-10'
        }
      ]
    }
    const action = addTravel(1, 'Mar-A-Lago, FL', '2017-12-13')

    const expectedState = {
      travels: [
        {
          id: 0,
          destination: 'Taranaki, NZ',
          date: '2017-09-10'
        },
        {
          id: 1,
          destination: 'Mar-A-Lago, FL',
          date: '2017-12-13'
        }
      ]
    }

    const newState = reducer(initialState, action)

    expect(newState).toEqual(expectedState)
  })

  it('should remove travel from the travel list', () => {
    const initialState = {
      travels: [
        {
          id: 0,
          destination: 'Taranaki, NZ',
          date: '2017-09-10'
        },
        {
          id: 1,
          destination: 'Mar-A-Lago, FL',
          date: '2017-12-13'
        },
        {
          id: 2,
          destination: 'North Wales, UK',
          date: '2017-12-31'
        }
      ]
    }
    const action = removeTravel(1)

    const expectedState = {
      travels: [
        {
          id: 0,
          destination: 'Taranaki, NZ',
          date: '2017-09-10'
        },
        {
          id: 2,
          destination: 'North Wales, UK',
          date: '2017-12-31'
        }
      ]
    }

    const newState = reducer(initialState, action)

    expect(newState).toEqual(expectedState)
  })

  it('should reschedule travel on the travel list', () => {
    const initialState = {
      travels: [
        {
          id: 0,
          destination: 'Taranaki, NZ',
          date: '2017-09-10'
        },
        {
          id: 1,
          destination: 'Mar-A-Lago, FL',
          date: '2017-12-13'
        }
      ]
    }
    const action = rescheduleTravel(1, '2021-01-20')

    const expectedState = {
      travels: [
        {
          id: 0,
          destination: 'Taranaki, NZ',
          date: '2017-09-10'
        },
        {
          id: 1,
          destination: 'Mar-A-Lago, FL',
          date: '2021-01-20'
        }
      ]
    }

    const newState = reducer(initialState, action)

    expect(newState).toEqual(expectedState)
  })
})
