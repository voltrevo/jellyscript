'use strict';

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
    ['a.b = b.c = c.d'],
    ['func => nil'],
    ['3 + func => nil'],
    ['func { return nil; } + 1'],
    ['(1)'],
    ['2 * (3 + 4)'],
    ['(x)++'],
    ['++(x)++'],
    ['(1 + 2) * (3 + 4)'],
    ['((1))'],
    ['(3 * (1 + 1)) * 17'],
    ['x()'],
    ['x(1, 2) + y(3, 4)'],
    ['x((1))'],
    ['(a)(b)'],
    ['foo(3, 4 + 5 * (6 + y) / j(34))']
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
    ['3-'],
    ['1e1.1'],
    ['"'],
    ['"""'],
    ['(\')'],
    ['(1one)'],
    ['(1, 2)'],
    ['x(())'],
    ['(,)'],
    ['(foo,)'],
    ['(,foo)'],
    ['()'],
    [' ()'],
    ['() '],
    ['|'],
    ['**'],
    ['==='],
    ['!==']
  ]
});
