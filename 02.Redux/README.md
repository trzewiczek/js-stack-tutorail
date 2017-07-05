[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# 02. Redux

### 🎓 Some theory

> Redux is a predictable state container for JavaScript apps.
>
> —[Redux Official Website](http://redux.js.org/)

**Store**
 * a single JavaScript object wrapped by some slim redux layer
 * a single source of truth about the FE application and its state
 * keeps both data state (list of todos) and app state (sort order of todos)
 * never mutated, always replaced with a new object
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
 * at minimum it has to have a `type: <string>` field
 * along with type it may contain any data (see examples below)
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
 * a [pure function](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976) that transforms current state into next state using action payload
 * it's signature is: `(state = <default state>, action) => newState`
 * [called every time store dispatches an action](https://github.com/reactjs/redux/blob/master/src/createStore.js#L170)
 * if default state argument is defined it will initialize the state when app first starts (due to dummy action triggered during state registration)
 * by convention it's implemented by a single `switch` statement
 * if called by an action it doesn't understand, returns `state` untouched

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
