[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# 02. Redux

### 🎓 Some theory

> Redux is a predictable state container for JavaScript apps.
>
> —[Redux Official Website](http://redux.js.org/)

Quote above makes it clear: Redux is not related to React and is not a frontend
framework. It's a library to make state management in JavaScript apps easy to
work with and reason about. It works smoothly with React, but it works fine with
console apps, Angular, and whatever you find it suitable for. It might as well
be possible that [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367). 

First, let's start with a few facts about key Redux elements that will let you 
better understand how things talk one to another within Redux realm.

**Store**
 * a single JavaScript object wrapped by some slim redux layer
 * a single source of truth about the application and its state
 * keeps both data state (i.e. list of todos) and app state (i.e. sort order of todos)
 * never mutated, always replaced with a new object via `reducer`
 * can dispatch events (a.k.a actions)

```javascript
// store shape example
{
  todos: [
    { id: 0, text: 'Install yarn', status: 'DONE' },
    { id: 1, text: 'Learn Redux', status: 'IN_PROGRESS' }
  ],
  lastUpdated: 1493826516796,
  sort: {
    key: 'status',
    order: 'DESC'
  }
}
```

**Action**
 * a JavaScript object representing event in the application
 * at minimum it has to have a `type: <string>` field (see examples below)
 * along with type it may contain any data a.k.a. payload (see examples below)
 * it's dispatched by the `store`

```javascript
// minimal action example
{
  type: 'DELETE_ALL_TODOS'
}

// slightly bigger example
{
  type: 'ADD_TODO',
  todoId: 5,
  todoText: 'Implement Trello in Redux'
}

// even bigger example
{
  type: 'ADD_TODO',
  todo: {
    id: 5,
    text: 'Implement Trello in Redux'
  },
  todoList: 'JS Stack Tutorail',
  meta: {
    status: 'SUCCESS',
    timestamp: 1493826516796
  }
}
```

**Reducer**
 * a [pure function](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976) 
   that transforms current state into next state using action payload
 * it's signature is: `(state = <default state>, action) => newState`
 * [called every time store dispatches an action](https://github.com/reactjs/redux/blob/master/src/createStore.js#L170)
 * if default value for state argument is defined the value will initialize the state 
   when the application first starts (due to dummy action triggered during state registration)
 * by convention `reducer`'s body is a single `switch` statement
 * if triggered by an event (`action.type`) it doesn't understand, returns `state` untouched

```javascript
// reducer example
const reducer = (state = { todos: [], sort: { key: 'id', order: 'ASC' } }, action) => {
  switch(action.type) {
    case 'SORT_KEY_CHANGED':
      return {
        ...state,
        sort: {
          key: action.sortKey,
          order: action.sortOrder
        }
      }
    case 'TODO_ADDED':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.todoId,
            text: action.todoText,
            status: 'NEW'
          }
        ]
      }
    default:
      return state
  }
}
```

There are some other interesting concepts in Redux we will learn later into tutorial 
These three though create the core of what Redux is: 

 * a single store, `{ todos: ['Learn Yarn'] }`
 * dispatches actions, `{ type: 'ADD_TODO', text: 'Learn Redux' }`
 * which trigger reducers, `(state = { todos: [] }, action) => state`
 * responsible to transform the store, `case 'ADD_TODO': return { todos: [...state.todos, action.text ] }`
 * to its new shape, `{ todos: ['Learn Yarn', 'Learn Redux'] }`
 
That's it. 

### 🛠 Basic setup
We start with installing `redux`:

```bash
[js-stack-tutorail]$ yarn add redux
```

Congratulations! We're done with setup. 🏆

### 🚀 In action
Before we do some real coding let's use the example above to test if `redux` 
really works. 

We've said `reducer` is a pure function, which makes it so easy to test. Let's 
do it then. 

Create a `src` folder and put the unit test file inside:

```bash
[js-stack-tutorail]$ mkdir src
[js-stack-tutorail]$ touch src/index.test.js
```

From three elements mentioned above—store, action, reducer—it is `reducer` that
actually does something (i.e. transforms old state into new state with action 
payload). We'll start with it then. 

Earlier we've mentioned four assumptions about each `reducer`:

 1. it initializes the state with a default value if no state is defined yet
 2. it creates new state based on old one and action payload
 3. it doesn't change the old state
 4. it doesn't affect the state at all if it doesn't recognize the `action.type`

One unit test for each gives us:

```javascript
// index.test.js
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

```

As mentioned earlier:

 1. reducer's signature is `(state = <default>, action) => state`
 2. by convention `reducer` is actually a single `switch` statement

In unit tests we specified that:
 1. the default state value in the reducer is `{ todos: [] }`
 2. the only `action.type` (i.e. `case`) recognized by the reducer is `ADD_TODO`

Create a `src/index.js` file and implement such a reducer:

```javascript
// index.js
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
```

Gratification time 🎉

```bash
[js-stack-tutorail]$ yarn test
yarn test v0.24.6
$ standard --verbose | snazzy && jest --coverage
 PASS  src/index.test.js
  Todo List Reducer
    ✓ should initialize store with empty todo list (6ms)
    ✓ should add todo to the end of todo list (1ms)
    ✓ should create a new state leaving an old one untouched (2ms)
    ✓ should leave state untouched when action is not recognized (1ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        1.207s
Ran all test suites.
----------|----------|----------|----------|----------|----------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------|----------|----------|----------|----------|----------------|
All files |      100 |      100 |      100 |      100 |                |
 index.js |      100 |      100 |      100 |      100 |                |
----------|----------|----------|----------|----------|----------------|
Done in 3.48s.
```

And voila! Reducer works fine. 🎂

But wait, where's `redux`?

### 📖 Resources
⌚

### 🔍 Extras
⌚
