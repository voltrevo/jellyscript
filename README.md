# Jellyscript

A scripting language that's a lot like javascript, but stripped down, much stricter, and with a few tweaks.

## Status

Concept code, and a not yet functioning WIP parser.

## Javascript Differences

- There is no global scope or object.
- Strict by default.
- `=` means creation, `~` means mutation. This applies to variables, object properties, and array elements. It provides extra protection and eliminates keywords like `var` and `let`.
- Array elements are added and removed with `pushBack`, `pushFront`, `popBack`, `popFront`. This means they don't get holes per se (they can still contain `nil`s), and you always use `~` to mutate elements, `=` can't be used to add new elements.
- Arrays have `front` and `back` methods.
- Statements such as `"use strict";` that have no effect are illegal. Something like `[[compiler.languageFun();]]` should be provided for language extensions.
- Block scoping and if/for scoping. No function scoping.
- Shadowing variables is illegal.
- Use `func` instead of `function`.
- No named functions (i.e. must use `foo = func() {}` instead of `func foo() {}`)
- No contexts / `this` is not a keyword.
- No `arguments` keyword (use `func(args...) {}` syntax).
- No `with`.
- Properties can't be added to functions, arrays, etc. Only vanilla objects.
- Enforce calling functions with correct number of args.
  - But explicit defaults for arguments and variadic functions relax this.
- Functions must always return something explicitly. The return keyword can be avoided with the `=>` variations.
- `==` and `!=` mean strict comparison, `===` and `!==` are illegal.
- No type coercion. For example `+` will work with two strings or two numbers but not a mixture.
- `import` is the only external variable provided to a module. Modifying the `import` passed in to a module is supported and is encouraged (but very frequent use is probably an anti-pattern).
- Modules are just functions, with an implicit `func(import) {` header and `};` footer. The return value is what the module exports.
- Circular imports are illegal. If it is really intended, it can be emulated. (TODO: example).
- `nil` replaces `undefined` and `null`. It (probably) won't ever be produced implicitly by the core language (standard libraries should make use of it though).
- By the way, `nil` is a keyword and can't be modified.
- Truthy and falsy replaced with just a non-nil vs nil idiom.
  - Conditional expressions must produce booleans or conform to `if (foo = getFoo()) {}`, which executes the body when `foo != nil` (including when `foo` is `0` or even `false`).
  - `||` and `&&` operate on booleans only.
  - Use `a ?: b ?: c` to get the first non-nil element of `[a, b, c]`.
- Semicolons are required for now. Clear rules may be established to terminate statements with newlines. If so avoiding semicolons will be properly supported and encouraged. For example the need for patterns like `;[]` and `;(func() {})()` must be avoided.
- `for` is the only loop construct, similar to golang.
  - `for {}` is an infinite loop (can be escaped with `break` or `return`).
  - `for (foo != nil) {}` executes the body until `foo == nil`.
  - `for (a; b; c) {}` might not be implemented.
  - `for (x of [1, 2, 3]) {}` executes the body for each array element.
- No defineProperty. There are only vanilla properties and properties never produce side effects.
- Strings must be double-quoted.
- (This list is not complete.)
