'use strict';

var value = require('../value.js');
var generator = require('./generator.js');

generator('value', value, {
  valid: [
    ['true'],
    // TODO: ['func => nil'],
    ['foobar'],
    ['nil'],
    ['42'],
    ['"bluey"']
  ],
  invalid: [
    [''],
    [' =>'],
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
    ['(1)'],
    ['--3'],
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
  ]
});
