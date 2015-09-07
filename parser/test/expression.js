'use strict';

// TODO: expressions can contain functions, function calls, and parenthetical expressions!

var expression = require('../expression');
var generator = require('./generator.js');

generator('expression', expression, {
  valid: [
    ['0'],
    ['"foo"'],
    ['1 + 1'],
    ['x++'],

    // Yes this is valid as far as the parser is concerned. It would get rejected later.
    ['1++'],

    ['x++ + 1'],
    ['++x++'],
    ['--3'],

    // Right now this is expected to be equivalent to '-- -x', but I'm not sure whether that's a
    // good idea.
    ['---x'],

    ['---3'],
    ['-- -x'],
    ['-a + b'],
    ['- - - - -x'],
    ['x++ ++'],
    ['-- --x'],
    ['a.b'],
    ['a.b++'],
    ['a = b'],
    ['a ~ b'],
    ['a.b = c'],
    ['foo ~ bar'],
    ['foo~bar'],
    ['foo~bar++'],
    ['foo~++bar++'],
    ['a = b = c = d'],
    ['a.b = b.c = c.d']
  ],
  invalid: [
    [''],
    [' =>'],
    ['=>'],
    ['=> '],
    ['==>'],
    [' true'],
    [' true '],
    ['false '],
    ['&'],
    ['1one'],
    [' foo'],
    ['7u'],
    [' 1'],
    ['1 '],

    // TODO: this should be valid, but parenthetical expressions are not yet implemented.
    ['(1)'],

    ['3-'],
    ['1e1.1'],
    ['"'],
    ['"""'],
    ['(\')'],
    ['(1one)'],
    ['(,)'],
    ['(foo,)'],
    ['(,foo)'],
    [' ()'],
    ['() '],
    ['|'],
    ['**'],
    ['==='],
    ['!==']
  ]
});
