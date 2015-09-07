'use strict';

var argumentList = require('../argumentList.js');
var generator = require('./generator.js');

generator('argumentList', argumentList, {
  valid: [
    ['()'],
    ['(a, b)'],
    ['(x)'],
    ['(a,b)'],
    ['( a , b )'],
    ['(one, two, three, four, five)'],
    ['(six,seven , eight,nine ,ten)']
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
    ['(one, two oops, three)'],
    ['(one, two, ,oops, three)']
  ]
});
