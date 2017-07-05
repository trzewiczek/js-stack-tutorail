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
⌚

### 🚀 In action
⌚

### 📖 Resources
⌚

### 🔍 Extras
⌚
