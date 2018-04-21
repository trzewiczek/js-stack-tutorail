[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# 00. Environment

## 00 node & yarn
In this tutorial we will be using `node` and `yarn`. Go there and install them.
When ready run this:

```bash
$ mkdir js-stack-tutorail
$ cd js-stack-tutorail
$ yarn init -y
```

You're ready!

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
  },
  // other settings
}
```

> Be aware the trailing comma after the newly added settings! `package.json`
> is, well... a regulat JSON, so it has to be a valid JavaScript object.

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
accepted in the community and make it 'Plug & Play' kind of tool. Except the
output...By default `standard` output 'leaves some area for improvements' and
is not easy to read.

Instead we'll use `snazzy`, a simple and clean `standard` output formatter.

Both are developer utilities, so we'll install them as `--dev` dependencies:

```bash
[js-stack-tutorail] $ yarn add --dev standard snazzy
```

We'll use `standard` (with `snazzy` formatter) as the first step in our `test`
flow by adding it into `test` section of our `scripts` in `package.json`:

```javascript
// package.json
{
  // other settings
  "scripts": {
    "start": "babel-node src",
    "test": "standard --verbose | snazzy"
  },
  // other settings
}
```

We use `--verbose` output to let `snazzy` inform us about the rule each error
and warning falls upon making it easier to tweak `standard` behavior.

Before we continue let's set up our IDE, so it helps us keep the `standard`!
Good for us `standard` has a great support in VS Code. Just hit `Ctrl+P`,
paste `ext install chenxsan.vscode-standardjs`, hit `Enter` and install
`JavaScript Standard Style` plugin. Easy.

To make it really funky set its `autoFixOnSave` option to `true` in your
VS Code settings file. To do that select File -> Preferences -> Settings or hit `Ctrl+,`. 
In the `USER SETTINGS` section paste `"standard.autoFixOnSave": true,` in the curly brackets.

```javascript
// vscode settings
{
  // other settings
  "standard.autoFixOnSave": true,
  // other settings
}
```

Remember to delete the comma if it's the last setting:
```javascript
// vscode settings
{
  // other settings
  "standard.autoFixOnSave": true
}
```

After reloading the Window (`F1 > reload > Enter`) `standard` will not only
automatically run in the background and lint your code on the fly, but as well
it will do most obvious code cleanup (indentation etc.) every time you hit
`Ctrl+S`.

📝 Even if you have an auto-save option turned on you still have to hit
`Ctrl+S` to trigger `standard.autoFixOnSave`.


### 🚀 In action
Earlier in the tutorial we've created a `src/index.js` file with the
following snippet inside:

```javascript
import fs from 'fs'

fs.realpath('.babelrc', (err, path) => {
  console.log(`>>> ${path}`)
})
```

Let's use it to test if `standard` actually works:

```bash
[js-stack-tutorail]$ yarn test
yarn test v0.24.6
$ standard --verbose | snazzy
standard: Use JavaScript Standard Style (https://standardjs.com)

/home/trzewiczek/code/js-stack-tutorail/00.Environment/src/index.js
  3:25  error  Expected error to be handled  handle-callback-err

✖ 1 problem
error Command failed with exit code 1.
```

`standard` is a smart tool reaching far beyond missing commas and single
quotes. Here it reminds us that the `error` scenario is not covered by the
callback we provided to `fs.realpath` function. Let's fix it:

```javascript
import fs from 'fs'

fs.realpath('.babelrc', (err, path) => {
  if (err) {
    console.error(`!!! ${err}`)
  }
  console.log(`>>> ${path}`)
})

```

```bash
[js-stack-tutorail]$ yarn test
yarn test v0.24.6
$ standard --verbose | snazzy
Done in 0.96s.
```

Smooth and gentle!

### 📖 Resources
 * [Standard JS official website](https://standardjs.com/)
 * [JavaScript Standard Style in VS Marketplace](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs)
 * [Snazzy formatter](https://github.com/standard/snazzy)


### 🔍 Extras
`Standard` follows quite a rigorous approach: [no overwriting the rules](https://standardjs.com/index.html#i-disagree-with-rule-x-can-you-change-it).

> The whole point of standard is to save you time by avoiding
> [bikeshedding](https://www.freebsd.org/doc/en/books/faq/misc.html#bikeshed-painting)
> about code style.
>
> [Standard JS FAQ](https://standardjs.com/index.html#i-disagree-with-rule-x-can-you-change-it)

And then its authors add:

> Pro tip: Just use `standard` and move on. There are actual real problems
> that you could spend your time solving! :P

It still let you avoid some warnings if you explicitly ask it for:

> JavaScript Standard Style uses ESLint under-the-hood and you can hide warnings
> as you normally would if you used ESLint directly.

```javascript
let str1 ="Turn off all rules on this line" // eslint-disable-line
let str2 = "Turn only specific rule on this line" // eslint-disable-line quotes
```

Important part of working with `standard` are `globals`. Some of them may not be
recognized by `standard`, so we have to make it understand what we do. For this
reason we set `globals` by one of methods:
 * putting a special comment on top of the file
 * adding globals to `standard` config in `package.json`

```javascript
/* global fetch */
```

or

```javascript
// package.json
{
  // other settings
  "standard": {
    "globals": [ "fetch" ]
  },
  // other settings
}
```

📝 Globals introduced by some libraries (like `describe` or `expect` populated
into global scope by `jest` test framework) can be handled via yet another
configuration pattern shown in the next chapter of the tutorial.


## 03 Documentation

🏗️ This section is under development!

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
  },
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
  },
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
 * [ESDoc official website](https://esdoc.org/)

### 🔍 Extras
