# 01. Jest

## 01 Transpiler & ES6 Support
Newest JavaScript features are yet not implemented in most of the browsers. 
For this reason we have to transpile our ES6 code into ES5 compatibile one, 
so all the browsers and environments support it. 

We use `babel` as a transiller with `env` preset, which tells `babel` what language
feature take into consideration when doing its job. `env` preset uses all the
newest features of JavaScript and is a pure piece of magic. 

```bash
$ yarn add --dev babel-cli babel-preset-env
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
`babel-polifyll` before doing anything else ensuring a single import 
of the polifyll into the code base. 

To test if the transpiller works fine let's try to use `import` statement
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
transpiller would not make its part. Let's try. 

```bash
$ yarn start
yarn start v0.24.6
$ babel-node src
>>> /home/trzewiczek/code/react_redux_rxjs_reselect_jest_enzyme/01.Jest/.babelrc
Done in 1.40s.
```

Works fine! Let's try if `node` can handle it without `babel`'s help:

```bash
$ node src
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

Not really. 🐈

## 02 Linter

> Programs must be written for people to read, and only incidentally for machines to execute.
> —Hal Abelson

`Standard` comes with no extra configuration costs. Its defaults are widely 
accepted in teh community and make it plug & play kind of tool. 

```bash
$ yarn add --dev standard
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

After reloading the Window (F1 > Reload > Enter) `Standard` will 
automatically run in the background and lint your code. Every time you hit 
`Ctrl+S` it will do most obvious code cleanup (indentation etc.).

**Resources**
 * [Standard JS official website](https://standardjs.com/)
 * [JavaScript Standard Style in VS Marketplace](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs)

## 03 Documentation

## 04 Test framework
