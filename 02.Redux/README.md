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
 * a single JavaScript object representing application state wrapped by some 
   minimal `redux` interface (namely four methods!)
 * a single source of truth about the application and its state
 * keeps both data state (i.e. list of todos) and app state (i.e. sort order of todos)
 * never mutated, always replaced with a new object via `reducer` (see below)
 * can dispatch events (a.k.a actions—see below)
 * can register middleware (more on that in next chapter)

```javascript
// example of the state managed by redux store
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
 * a JavaScript object representing event in the application, e.g. adding todo
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
   that transforms current store's state into next state using action payload
 * it's signature is: `(state = <default state>, action) => state`
 * [called every time store dispatches an action](https://github.com/reactjs/redux/blob/master/src/createStore.js#L170)
 * if default value for state argument is defined the value will initialize the 
   state when the `store` is created
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

There are some other interesting concepts in Redux we will learn later into tutorial. 
These three though create the core of what Redux is: 

 * a single `store`, `{ todos: ['Learn Yarn'] }`
 * dispatches `actions`, `{ type: 'ADD_TODO', text: 'Learn Redux' }`
 * which trigger pure `reducers`, `(state = { todos: [] }, action) => state`
 * aimed at transforming store's state, `case 'ADD_TODO': return { todos: [...state.todos, action.text ] }`
 * to its new shape, `{ todos: ['Learn Yarn', 'Learn Redux'] }`
 
That's it. 

### 🛠 Basic setup
To the code! We start with installing `redux`:

```bash
[js-stack-tutorail]$ yarn add redux
```

Congratulations! We're done with setup. 🏆

### 🚀 In action I
Before we do some real coding let's use the example from last bullet list 
above to test if `redux` really works this way. 

Create a `src` folder and put the unit test file inside:

```bash
[js-stack-tutorail]$ mkdir src
[js-stack-tutorail]$ touch src/index.test.js
```

From three elements mentioned above—store, action and reducer—it is `reducer` that
actually does something (i.e. transforms old state into new state with action 
payload). We'll start with it then. Good news is, it's a pure function which 
makes it trivial to test. Let's collect the spec!

Earlier we've mentioned four assumptions about each and every `reducer`:

 1. it initializes the state with a default value if no state is defined yet
 2. it creates new state based on both old state and action payload
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

    const expectedState = {
      todos: [ 'Learn Yarn' ]
    }
    const newState = reducer(initialState, action)

    expect(initialState).toEqual(expectedState)
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
 2. the only `action.type` (i.e. `case`) reducer recognizes is `ADD_TODO`

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

But wait, it's just a pure function with a few conventions around its shape.
Where's `redux`?

It's here, in your REPL! (I've added numbering in pseudo-comments to refer to 
certain lines in the description below the listing)

```bash
[js-stack-tutorail]$ ./node_modules/.bin/babel-node
# [1]
> const reducer = require('./src/index').reducer
> const redux = require('redux')
# [2]
> const store = redux.createStore(reducer)
> store
{ dispatch: [Function: dispatch],
  subscribe: [Function: subscribe],
  getState: [Function: getState],
  replaceReducer: [Function: replaceReducer] }
# [3]
> store.getState()
{ todos: [] }
# [4]
> store.dispatch({ type: 'ADD_TODO', text: 'Learn action creators' })
> store.getState()
{ todos: [ 'Learn action creators' ] }
> store.dispatch({ type: 'ADD_TODO', text: 'Learn async middleware' })
> store.getState()
{ todos: [ 'Learn action creators', 'Learn async middleware' ] }
# [5]
> store.dispatch({ type: 'ADD_POWER_POINT', text: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.' })
> store.getState()
{ todos: [ 'Learn action creators', 'Learn async middleware' ] }
```

Let's go through it step by step:
 
 1. We import both our `reducer` and `redux`.     
    (Even `babel-node` doesn't let us use `import` statements, though it still 
    let us use `export` statement in our `src/index` module.)
 2. We create a new `store` providing it our `reducer`. It gets a slim `redux`
    interface of 4 methods (`dispatch`, `subscribe', `getState` and `replaceReducer`)
 3. The store has been initialized with the default state value in our `reducer`. 🍾
 4. Next we dispatch two 'ADD_TODO' actions and it turns out that each time the 
    state is updated according to our expectations. 
 5. Finally we dispatch an action our `reducer` doesn't understand, so it just
    passes without bothering the state. (good news: `redux` doesn't understand *corpo ipsum*!)

Having proven `redux` works as promised we can start implementing 'a real app': 
**a travel planner**!

### 🚀 In action II
So where to start with the **planner**? Probably with `actions`. Let's list
them and let's take an enum kind of approach here. Instead of using plain 
strings for action types we'll put them as constants in `src/actionTypes.js` 
file:

```javascript
// actionTypes.js
export const ADD_TRAVEL = 'ADD_TRAVEL'
export const REMOVE_TRAVEL = 'ADD_TRAVEL'
export const RESCHEDULE_TRAVEL = 'RESCHEDULE_TRAVEL'
```

It might look redundant at first but soon you'll want to keep all supported 
actions in one place. And you'll want to have constants instead of simple
strings so your IDE warns you about the typos and runtime breaks when meets one.

Remember that the `store` cares only if an action object has a `type` defined.
Reducers on the other hand care only about the action types they recognize. 
A typo in the action type could then lead to a long debugging session, because
it would pass silently. Technically it's not a bug, system just doesn't support
such an action. With all actions defined as constants IDE will immediately warn 
you about the typo and runtime will break with grace. 

Back to **travel planner**! We've defined some events that can occur in our app.
Let's now think how the action objects representing each event could look like. 

```javascript
{
  type: ADD_TRAVEL,
  id: 0,
  destination: 'Taranaki, NZ',
  date: '2017-09-10'
}

{
  type: REMOVE_TRAVEL,
  id: 0
}

{
  type: RESCHEDULE_TRAVEL,
  id: 0,
  date: '2017-09-17'
}
```

Can you imagine the app already?

Now just like with the action types constants let's create a simple interface 
over how the objects actually look like. We'll call it `action creators` and
will use a snippet above to specify them in `src/actions.test.js` file:

```javascript
// actions.test.js
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

    const result = addTravel(0, 'Mar-A-Lago', '2017-12-13')

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
```

Simple and straightforward. Just like `action creators` should be. Ready
to implement them?

```javascript
// actions.js
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
```

We use some funky and very compact ES6 syntax here: 
[object property shorthand](http://es6-features.org/#PropertyShorthand),
[arrow functions](http://es6-features.org/#ExpressionBodies)
and their [simplified object return syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Returning_object_literals). 

Anyway. Whenever we want to dispatch an action we can now use `action creators`
like this:

```javascript
store.dispatch(addTravel(5, 'North Wales, UK', '2017-09-10'))
store.dispatch(rescheduleTravel(4, '2017-10-09'))
store.dispatch(removeTravel(2))
```

So having types of events that can occur in the system and the shape of action
objects representing them we could probably think about the shape of state in 
the store and some reducers to handle our actions.  

From our `action creators` implementation one can think that the shape of state
will be something like:

```javascript
{
  travels: [
    {
      id: <number>,
      destination: <string>,
      date: <string>
    }
    ...
  ]
}
```

The truth is there is no obligation for the state to be an object and in our
case it could as well be a flat list like this one:

```javascript
[
  {
    id: <number>,
    destination: <string>,
    date: <string>
  }
  ...
]
```

What's more, we could probably simplify the implementation by removing `id` 
thing—we could just use array indices. 

Keeping in mind that for the current requirements it's too much, let's stay 
with an object so we don't have to re-implement too much in the next chapter. 



### 📖 Resources
⌚

### 🔍 Extras
⌚
