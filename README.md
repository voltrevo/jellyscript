# Jellyscript
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Code Climate](https://codeclimate.com/github/voltrevo/jellyscript/badges/gpa.svg)](https://codeclimate.com/github/voltrevo/jellyscript) [![Coverage Status](https://coveralls.io/repos/voltrevo/jellyscript/badge.svg?branch=master&service=github)](https://coveralls.io/github/voltrevo/jellyscript?branch=master)
> A scripting language that's a lot like javascript, but stripped down, much stricter, and with a few tweaks.

## Status

A complete-ish parser and concept code.


## Javascript Differences

- There is no global scope or object.
- Strict by default.
- `=` means creation, `~` means mutation. This applies to variables, object properties, and array elements. It provides extra protection and eliminates keywords like `var` and `let`.
- Array elements are added and removed with `pushBack`, `pushFront`, `popBack`, `popFront`. This means they don't get holes per se (they can still contain `nil`s), and you always use `~` to mutate elements, `=` can't be used to add new elements.
- Arrays have `front` and `back` methods.
- Statements such as `'use strict';` that have no effect are illegal. Something like `[[compiler.useLightningKittens();]]` should be provided for language extensions.
- Block scoping and if/for scoping. No function scoping.
- Shadowing variables is illegal.
- Use `func` instead of `function`.
- No named functions (i.e. must use `foo = func() {}` instead of `func foo() {}`)
- No `with`.
- No contexts / `this` is not a keyword.
- No `arguments` keyword.
- All functions accept one argument and have one return value.
  - `func { /* code */ }` implicitly accepts nil (it's an error to pass something other than nil)
  - `func {}` implicitly returns nil
  - Multiple input arguments and multiple return values are emulated via destructuring.
  - Destructuring enforces the number of variables to match.
    - E.g. `[a, b] = [3];` and `[a] = [0, 0];` produce errors.
    - But defaults are supported, so `[a, b = nil] = 3;` is ok.
    - And `[a, _] = [0, 0];` explicitly ignores the second zero.
- Ignoring the return value of a function is an error unless it returns nil
  - `(func => 3)();` error: non-nil return value ignored
  - `func{}();` ok
  - Use `_` to explicitly ignore return values e.g. `_ = (func => 3)();`
  - `_` can also ignore function input if non-nil input is acceptable:
    - `(func => 3)(17);` error: 17 passed to function that takes no input
    - `(func(_) => 3)(17);` ok
- Properties can't be added to functions, arrays, etc.. Only vanilla objects.
- `==` and `!=` mean strict comparison, `===` and `!==` are illegal.
- No type coercion. For example `+` will work with a pair of strings, numbers, arrays, or objects but not a mixture.
- `+` operates on arrays by concatenating them
- `+` operates on objects by merging them (duplicate keys raise errors)
- `import` is the only external variable provided to a module. Modifying the `import` passed in to a module is supported and is encouraged (but very frequent use is probably an anti-pattern).
- strings, arrays, and objects can be multiplied by whole non-negative numbers (objects will often fail, e.g. {x: 0} * 2 raises an error due to duplicate key x)
- Modules are just functions, with an implicit `func(import) {` header and `};` footer. The return value is what the module exports.
- Circular imports are illegal. If it is really intended, it can be emulated. (TODO: example).
- `nil` replaces `undefined` and `null`. It (probably) won't ever be produced implicitly by the core language (standard libraries should make use of it though).
- By the way, `nil` is a keyword and can't be modified.
- Truthy and falsy replaced with just a non-nil vs nil idiom.
  - Conditional expressions must produce booleans.
  - `||` and `&&` operate on booleans only.
  - Use `a ?: b ?: c` to get the first non-nil element of `[a, b, c]`.
- No automatic semicolon insertion.
- `for` is the only loop construct, similar to golang.
  - `for {}` is an infinite loop (can be escaped with `break` or `return`).
  - `for (foo != nil) {}` executes the body until `foo == nil`.
  - `for (a; b; c) {}` might not be implemented.
  - `for (x of [1, 2, 3]) {}` executes the body for each array element.
- No defineProperty. There are only vanilla properties and properties never produce side effects.
- Strings must be single-quoted.
- (This list is not complete.)

## Web Demo

Live here: https://andrewmorris.io/jellyscript

You can see the syntax tree by typing `ast` in the console.

``` sh
npm run web-demo
```

If you'd like to use a different port, append `-- --port <port>`.


## Install

TODO (Will be the usual `npm install --save jellyscript` when the project is ready.)


## Usage

TODO


## License

MIT © [Andrew Morris](https://andrewmorris.io/)


[npm-image]: https://badge.fury.io/js/jellyscript.svg
[npm-url]: https://npmjs.org/package/jellyscript
[travis-image]: https://travis-ci.org/voltrevo/jellyscript.svg?branch=master
[travis-url]: https://travis-ci.org/voltrevo/jellyscript
[daviddm-image]: https://david-dm.org/voltrevo/jellyscript.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/voltrevo/jellyscript
[coveralls-image]: https://coveralls.io/repos/voltrevo/jellyscript/badge.svg
[coveralls-url]: https://coveralls.io/r/voltrevo/jellyscript
