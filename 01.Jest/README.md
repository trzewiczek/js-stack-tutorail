# 01. Jest

## 01 Transpiler & ES6 Support
Newest JavaScript features are yet not implemented in most of the browsers. 
For this reason we have to transpile our ES6 code into ES5 compatible one, 
so all the browsers and environments support it. 

We use `babel` as a transpiler with `env` preset, which tells `babel` what language
feature take into consideration when doing its job. `env` preset uses all the
newest features of JavaScript and is a pure piece of magic. 

```bash
[js-stack-tutorail] $ yarn add --dev babel-cli babel-preset-env
```

To make use of `babel` we will use its `babel-node` executable instead of 
a regular `node`. This will let `babel` do its magic before it passes 
transpilled code into `node`. 

To make it happen we make `yarn` run our code by adding a `scripts` section
into `package.json` and next to `package.json` we add a `babel` config file:
`.babelrc` containing presets configuration. 

```javascript
// package.json
{
  // other settings
  "scripts": {
    "start": "babel-node src"
  }
  // other settings  
}
// .babelrc
{
  "presets": [
    "env"
  ]
}
```

One thing worth mentioning about `babel-node` is that on run it loads 
`babel-polyfill` before doing anything else ensuring a single import 
of the polyfill into the code base. 

To test if the transpiler works fine let's try to use `import` statement
clearly not supported by `node` environment (version 6.10). We will import
`fs` module to determine the full absolute path of our `.babelrc` file.

Create a `src` folder with `index.js` file inside and put the following 
code snippet into it. 

```javascript
import fs from 'fs'

fs.realpath('.babelrc', (err, path) => {
  console.log(`>>> ${path}`)
})
```

Your project structure at this stage should look like this:

```bash
.
├── .babelrc
├── package.json
├── src
│   └── index.js
└── yarn.lock
```

`import` statement is not supported by node, so it should fail if the 
transpiler would not make its part. Let's try. 

```bash
[js-stack-tutorail] $ yarn start
yarn start v0.24.6
$ babel-node src
>>> /home/trzewiczek/code/react_redux_rxjs_reselect_jest_enzyme/01.Jest/.babelrc
Done in 1.40s.
```

Works fine! Let's try if `node` can handle it without `babel`'s help:

```bash
[js-stack-tutorail] $ node src
/home/trzewiczek/code/react_redux_rxjs_reselect_jest_enzyme/01.Jest/src/index.js:1
(function (exports, require, module, __filename, __dirname) { import fs from 'fs'
                                                              ^^^^^^
SyntaxError: Unexpected token import
    at createScript (vm.js:56:10)
    at Object.runInThisContext (vm.js:97:10)
    at Module._compile (module.js:542:28)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:390:7)
    at startup (bootstrap_node.js:150:9)
```

Not really. 🐱

## 02 Linter

> Programs must be written for people to read, and only incidentally for machines to execute.
> —Hal Abelson

`Standard` comes with no extra configuration costs. Its defaults are widely 
accepted in teh community and make it plug & play kind of tool. 

```bash
[js-stack-tutorail] $ yarn add --dev standard
```

We'll make it a first step of our `test` flow. 

```javascript
// package.json
{
  // other settings
  "scripts": {
    "start": "babel-node src",
    "test": "standard"
  }
  // other settings
}
```

`Standard` has a great support in VS Code. Just hit `Ctrl+P`, paste 
`ext install vscode-standardjs`, hit `Enter` and install 
`JavaScript Standard Style` plugin. To make it really funky
turn it's `autoFixOnSave` option on adding following snippet to your
VS Code settings file:

```javascript
// vscode settings
{
  // other settings
  "standard.autoFixOnSave": true
  // other settings  
}
```

After reloading the Window (`F1 > reload > Enter`) `Standard` will 
automatically run in the background and lint your code. Every time you hit 
`Ctrl+S` it will do most obvious code cleanup (indentation etc.).

Now all the code you write follows the same pattern, which makes it easy to 
collaborate on. 🐶

**Resources**
 * [Standard JS official website](https://standardjs.com/)
 * [JavaScript Standard Style in VS Marketplace](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs)

## 03 Documentation

Documentation is under investigation. Following some cool projects I just go with `esdoc`
with no extra setup. This will change in future. 

Install `esdoc`:

```bash
[js-stack-tutorail] $ yarn add --dev esdoc
```

Tell it where to find code and where to output the documentation:

```javascript
// .esdoc.json
{
  "source": "src",
  "destination": "doc"
}
```

Add a new `script` into your `package.json` file, so we can use `yarn` to 
generate documentation and let `standard` know that it should not lint the
js files in `doc/` folder. 

```javascript
// package.json
{
  // other settings
  "scripts": {
    "start": "babel-node src",
    "test": "standard",
    "doc": "esdoc"
  },
  "standard": {
    "ignore": [
      "doc/"
    ]
  }
  // other settings
}
```

Generate documentation with:

```bash
[js-stack-tutorail] $ yarn doc
```

In VS Code exclude `doc` folder in search settings. 

```javascript
// vscode settings
{
  // other settings
  "search.exclude": {
    "**/node_modules": true,
    "**/doc": true
  }
  // other settings
}
```

Your project structure should look like so:
```bash
.
├── doc/
│   └── <generated html documentation>
├── .babelrc
├── .esdoc.json
├── package.json
├── src
│   └── index.js
└── yarn.lock
```

With transpiler, linter and documentation generator we're finally ready to go! 🐹

## 04 Test framework

### Jest setup

The stack I'm building is based on React (with Redux and RxJS), so Jest seems
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

### Jest in action

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

Finally, let's generate some API documentation for our small module:

```bash
[js-stack-tutorail] $ yarn doc
yarn doc v0.24.6
$ esdoc
parse: /home/trzewiczek/code/js-stack-tutorail/01.Jest/src/index.js
parse: /home/trzewiczek/code/js-stack-tutorail/01.Jest/src/index.test.js
resolve: extends chain
resolve: necessary
resolve: access
resolve: unexported identifier
resolve: undocument identifier
resolve: duplication
resolve: ignore
resolve: link
resolve: markdown in description
resolve: test relation
output: badge.svg
output: identifiers.html
output: index.html
output: function/index.html
output: file/src/index.js.html
output: file/src/index.test.js.html
output: ./css
output: ./script
output: ./image
output: script/search_index.js
output: source.html
==================================
Coverage: 100% (2/2)
==================================
Done in 1.59s.
```

Looks like we're ready for some Redux coding! 🦁

**Resources**
 * [Jest official documentation](https://facebook.github.io/jest/docs/en/getting-started.html)