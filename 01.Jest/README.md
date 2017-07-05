# 01. Jest

### 🛠 Basic setup
The stack we're building is based on React (with Redux and RxJS), so Jest seems
to be a natural choice. And though `Jest` is a Facebook project it's not `React`
specific in any sense. We will use it for command-line app we're going to build
and only later in the process add `Enzyme` nad `React` to get the GUI.  

Installing Jest in our setup needs additional library—`babel-jest`. It does the
same magic `babel-node` does for the `start` script, i.e. it transpiles the ES6
code into ES5 compatible JavaScript. 

```bash
[js-stack-tutorail] $ yarn add --dev jest babel-jest
```

We will add it into `test` script of `package.json` file, right after `standard`
check. 
```javascript
// package.json
{
  // other settings  
  "scripts": {
    "start": "babel-node src",
    "test": "standard && jest --coverage",
    "doc": "esdoc"
  }
  // other settings
}
```

We have to take care about `standard` by letting it know it should ignore `coverage/` 
folder while linting and use `jest` globals (more on globals below) during linting. 

```javascript
{
  // other settings
  "standard": {
    "env": [
      "jest"
    ],
    "ignore": [
      "doc/",
      "coverage/"
    ]
  }
  // other settings
}
```

Finally, it's better to let VS Code know how to work with `jest`, i.e. exclude 
`coverage` folder from search path and set `standard` VS Code plugin environment
so it won't mark every global in red.  

```javascript
// vscode settings
{
  // other settings
  "search.exclude": {
    "**/node_modules": true,
    "**/doc": true,
    "**/coverage": true
  },
  "standard.options": {
    "env": [
      "jest"
    ]
  }
  // other settings
}  
```

`F1 > reload > Enter` and we're ready to go!

Let's write a canary test for our test runner. Create `src/first.test.js` file
and put the following snippet into it:

```javascript
test('Jest works for me', () => {
  expect(1).toBe(1)
})
```

Save it and run:

```bash
[js-stack-tutorail] $ yarn test
yarn test v0.24.6
$ standard && jest --coverage
 PASS  src/first.test.js
  ✓ Jest works for me (5ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.943s, estimated 1s
Ran all test suites related to changed files.
Done in 2.13s.
```

It works just fine (for me). 

### 🚀 In action
`Jest` follows quite a standard way of files selection based on the file name:

> By default it looks for .js and .jsx files inside of __tests__ folders, as well as any files with a suffix of .test or .spec (e.g. Component.test.js or Component.spec.js). It will also find files called test.js or spec.js.
> 
> Jest Official Documentation

Let's write some tests. Remove both files form `src/` folder and create a new
one called `index.test.js` with following content:

```javascript
import { pureFunction, asyncFunction } from './index'

describe('01. Jest', () => {
  it('should cut & reverse a list', () => {
    const aList = [ 4, 3, 2, 1 ]
    const expected = [ 1, 2, 3 ]

    const result = pureFunction(aList)

    expect(result).toEqual(expected)
  })

  it('should resolve to DONE', () => {
    const resolutionDelay = 8 * 1000
    const returnedPromise = asyncFunction(resolutionDelay)

    expect(returnedPromise).resolves.toBe('DONE')
  })
})
```

`Jest` handles both standalone `test` functions and `describe > it` pattern.
Interesting features visible in this little example are: 

 * `expect(<promise>).resolve.toBe(<value>)` which makes it `jest` wait till
   promise under testing resolves. If it won't resolve in 5 seconds `jest` will
   fail due to `Jasmine.DEFAULT_TIMEOUT_INTERVAL` (default: 5 seconds). 
 * `jest` mocks all timers and executes them immediately, so we don't have to 
   wait 8 seconds until it resolves (which would break jasmine's timeout!)

We will come back to more async goodness (and weirdness) of `Jest` when we 
introduce `RxJS` to handle async functions for us. 

Now let's put this snippet into `src/index.js` to make the test pass to let
us see `jest` in action. 

```javascript
/**
 * @example <caption>Input/Output data example</caption>
 * // input
 * [ 4, 3, 2, 1 ]
 * // output
 * [ 1, 2, 3 ]
 *
 * @example <caption>Input/Output data example</caption>
 * // input
 * [ { value: 'c' }, { value: 'b' }, { value: 'a' } ]
 * // output
 * [ { value: 'a' }, { value: 'b' } ]
 *
 * @param {Array<T>} list list of objects of type T
 * @return {Array<T>} shorten and reversed list of objects of type T
 */
export const pureFunction = (list) => {
  return list.slice(1).reverse()
}

/**
 * @example <caption>asyncFunction in action</caption>
 * const promise = asyncFunction(1000)
 * promise.then(action => dispatch({ type: action }))
 * 
 * @param {number} timeout Time of the promise resolution delay
 * @return {Promise<string>} Promise resolves to a string 'DONE'
 */
export const asyncFunction = (timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve('DONE'), timeout)
  })
}
```

Running test now gives us this lovely output:

```bash
[js-stack-tutorail] $ yarn test
yarn test v0.24.6
$ standard && jest --coverage
 PASS  src/index.test.js
  01. Jest
    ✓ should cut & reverse a list (6ms)
    ✓ should resolve to DONE (14ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.633s
Ran all test suites.
----------|----------|----------|----------|----------|----------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------|----------|----------|----------|----------|----------------|
All files |      100 |      100 |      100 |      100 |                |
 index.js |      100 |      100 |      100 |      100 |                |
----------|----------|----------|----------|----------|----------------|
Done in 4.67s.
```

Looks like we're ready for some Redux coding! 🦁

### 📖 Resources
 * [Jest official documentation](https://facebook.github.io/jest/docs/en/getting-started.html)
 * [jestjs tag on StackOverflow](https://stackoverflow.com/questions/tagged/jestjs)

### 🔍 Extras
`Jest` can be run in a watch mode. This way it reruns the tests every time you save the file. 
It's really helpful while doing TDD or refactoring and `jest-cli` comes with a feature heavily 
supporting this style of work, i.e. it can scope down the watched tests to a certain pattern. 

To see this in action split the test file into two separate ones, e.g. `src/index.test.js` and 
`src/async.test.js`:

```javascript
// index.test.js
import { pureFunction, asyncFunction } from './index'

describe('01. Jest--pure', () => {
  it('should cut & reverse a list', () => {
    const aList = [ 4, 3, 2, 1 ]
    const expected = [ 1, 2, 3 ]

    const result = pureFunction(aList)

    expect(result).toEqual(expected)
  })
})

// async.test.js
import { asyncFunction } from './index'

describe('01. Jest--async', () => {
  it('should resolve to DONE', () => {
    const resolutionDelay = 8 * 1000
    const returnedPromise = asyncFunction(resolutionDelay)

    expect(returnedPromise).resolves.toBe('DONE')
  })
})
```

Now run test with `--watch` option:

```bash
[js-stack-tutorail] $ yarn test -- --watch
 PASS  src/index.test.js
 PASS  src/async.test.js

Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.115s, estimated 1s
Ran all test suites.
----------|----------|----------|----------|----------|----------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------|----------|----------|----------|----------|----------------|
All files |      100 |      100 |      100 |      100 |                |
 index.js |      100 |      100 |      100 |      100 |                |
----------|----------|----------|----------|----------|----------------|

Watch Usage: Press w to show more.
```

Now hit `p` and type `async`:

```bash
Pattern Mode Usage
 › Press Esc to exit pattern mode.
 › Press Enter to apply pattern to all filenames.

 pattern › async

 Pattern matches 1 file
 src/async.test.js› src/async.test.js
 ```

`jest-cli` will show you an interactive preview of the folders and files matching
your pattern. You can use regular expressions to make it smart and after the
filtering of the tests hits your expectations just hit `Enter` to confirm it. 
In our example, starting from now on only async.test.js will be rerun on every
file save. 

```bash
 PASS  src/async.test.js
  01. Jest
    ✓ should resolve to DONE (2ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.084s, estimated 1s
Ran all test suites matching /async/.
----------|----------|----------|----------|----------|----------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------|----------|----------|----------|----------|----------------|
All files |       80 |      100 |    66.67 |       80 |                |
 index.js |       80 |      100 |    66.67 |       80 |             18 |
----------|----------|----------|----------|----------|----------------|

Watch Usage: Press w to show more.
```