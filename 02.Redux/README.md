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
  type: 'FILE_UPLOAD_FINISHED'
}

// slightly bigger example
{
  type: 'FILE_UPLOAD_FINISHED',
  status: 'SUCCESS',
  timestamp: 1493826516796,
  uri: '/wedding_collection/DSC561818.jpg'
}

// even bigger example
{
  type: 'FILE_UPLOAD_FINISHED',
  import: {
    status: 'SUCCESS',
    timestamp: 1493826516796
  },
  image: {
    uri: '/wedding_collection/c3c71757234f026213839dae95f00556.jpg',
    thumb: '/wedding_collection/thumbs/c3c71757234f026213839dae95f00556.jpg',
    name: 'DSC7251991.jpg'
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

**Middleware**
⌚

### 🛠 Basic setup
⌚

### 🚀 In action
⌚

### 📖 Resources
⌚

### 🔍 Extras
⌚
