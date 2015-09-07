'use strict';

var expression = require('../expression');
var generator = require('./generator.js');

generator('expression', expression, {
  valid: [
    ['0'],
    ['"foo"'],
    ['1 + 1'],
    ['x++'],
    ['--3']
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
    ['(1)'], // TODO: this should be valid
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
