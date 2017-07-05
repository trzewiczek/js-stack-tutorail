import { reducer } from './index'

describe('Todo List Reducer', () => {
  it('should initialize store with empty todo list', () => {
    const initialState = undefined
    const anyAction = { type: 'ANY_ACTION' }

    const expectedState = { todos: [] }

    const newState = reducer(initialState, anyAction)

    expect(newState).toEqual(expectedState)
  })

  it('should add todo to the end of todo list', () => {
    const initialState = {
      todos: [ 'Learn Yarn' ]
    }
    const action = {
      type: 'ADD_TODO',
      text: 'Learn Redux'
    }

    const expectedState = {
      todos: [ 'Learn Yarn', 'Learn Redux' ]
    }

    const newState = reducer(initialState, action)

    expect(newState).toEqual(expectedState)
  })

  it('should create a new state leaving an old one untouched', () => {
    const initialState = {
      todos: [ 'Learn Yarn' ]
    }
    const action = {
      type: 'ADD_TODO',
      text: 'Learn Redux'
    }

    const newState = reducer(initialState, action)

    expect(initialState).not.toEqual(newState)
  })

  it('should leave state untouched when action is not recognized', () => {
    const initialState = {
      todos: [ 'Learn Yarn' ]
    }
    const action = {
      type: 'UNKNOWN_ACTION',
      text: 'Learn Redux'
    }

    const expectedState = {
      todos: [ 'Learn Yarn' ]
    }

    const newState = reducer(initialState, action)

    expect(newState).toEqual(expectedState)
  })
})
