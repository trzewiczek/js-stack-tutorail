# 00. Environment

## 01 Transpiler & ES6 Support

### 🛠 Basic setup
The newest JavaScript features are not yet implemented in most of the browsers
(see [Module imports](https://caniuse.com/#feat=es6-module) as an example).
For this reason we have to transpile our [ES6](http://es6-features.org/) code
into ES5 compatible one, so all the browsers and environments support it.

For that purpose we use `babel`:

> Babel has support for the latest version of JavaScript through syntax
> transformers. These plugins allow you to use new syntax, right now
> without waiting for browser support.
>
> —[Babel Documentation](https://babeljs.io)

The easiest way to let `babel` know which plugins to utilize is to use one of
its presets. The most common one is `env`:

> Babel preset that automatically determines the Babel plugins you need
> based on your supported environments. Uses compat-table.
>
> —[Babel Documentation](http://babeljs.io/docs/plugins/preset-env/)

We use `babel` with its preset to transpile the code before it's executed,
so we install both as `--dev` dependencies:

```bash
[js-stack-tutorail] $ yarn add --dev babel-cli babel-preset-env
```

To make `babel` work for us we use its `babel-node` executable instead of
a regular `node`. This will let `babel` do its magic before it passes
transpilled code into `node` (see **Extras** section below).

To make it happen we'll add a `scripts` section into `package.json` file,
so `yarn` can take control over execution of our application (we will use
`gulp` finally when we introduce `webpack` later in the tutorial).

```javascript
// package.json
{
  // other settings
  "scripts": {
    "start": "babel-node src"
  }
  // other settings
}
```

As mentioned before `babel` needs to know which plugins to use. We can
specify it in `.babelrc` config file as follows:

```javascript
// .babelrc
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
```

Before we introduce React and browser environment we set up our target 
environment to current version of node, where 'current' means 'one that
executes this code'.


### 🚀 In action
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
├── node_modules
│   └── <libs of the world>
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
>>> /home/trzewiczek/code/js-stack-tutorail/00.Jest/.babelrc
Done in 1.40s.
```

Works fine! Let's try if `node` can handle it without `babel`'s help:

```bash
[js-stack-tutorail] $ node src
/home/trzewiczek/code/js-stack-tutorail/00.Jest/src/index.js:1
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

Not really.


### 📖 Resources 
 * [babel official website](http://babeljs.io/)
 * [env preset documentation](http://babeljs.io/docs/plugins/preset-env/)
 * [other babel presets](https://babeljs.io/docs/plugins/)
 * [babel repl](http://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&targets=&browsers=&builtIns=false&debug=false&code_lz=Q)
 * [babeljs most voted on StackOverflow](https://stackoverflow.com/questions/tagged/babeljs?sort=votes&pageSize=15)
 * [compat-table](http://kangax.github.io/compat-table/es6/) ECMAScript 5/6/7 compatibility tables
 * [Can I use...](https://caniuse.com/) Support tables for HTML5, CSS3, etc.


### 🔍 Extras
`babel` is actually two things: a transpiler and polyfill. The difference 
between them is that the first one—transpiler—transforms ES6 syntax into 
equivalent ES5 code and the other one—polyfill—populates the global 
environment and some `prototypes` with additional objects, properties and 
methods. 

`babel-node` uses both of them while executed which ensures that 
`babel-polyfill` is used before doing anything else and that there is a single
import of the polyfill into the code base.



## 02 Linter

> Programs must be written for people to read, and only incidentally for 
> machines to execute.
> 
> —Hal Abelson, co-author of 'Structure and Interpretation of Computer Programs'

### 🛠 Basic setup
`Standard` comes with no extra configuration costs. Its defaults are widely
accepted in the community and make it plug & play kind of tool. 

It's a developer tool, so we install it as a `--dev` dependency:

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
turn its `autoFixOnSave` option on adding following snippet to your
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

### 🚀 In action
Now all the code you write follows the same pattern, which makes it easy to
collaborate on. 🐶

### 📖 Resources
 * [Standard JS official website](https://standardjs.com/)
 * [JavaScript Standard Style in VS Marketplace](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs)


### 🔍 Extras


## 03 Documentation

Documentation is under investigation. Following some cool projects I just go with `esdoc`
with no extra setup. This will change in future.

### 🛠 Basic setup
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

### 🚀 In action
Generate documentation with:

```bash
[js-stack-tutorail] $ yarn doc
```

Your project structure should look like so:
```bash
.
├── .babelrc
├── .esdoc.json
├── doc
│   └── <generated html documentation>
├── node_modules
│   └── <libs of the world>
├── package.json
├── src
│   └── index.js
└── yarn.lock
```

With transpiler, linter and documentation generator we're finally ready to go!

### 📖 Resources 

### 🔍 Extras