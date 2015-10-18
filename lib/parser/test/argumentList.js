'use strict';

var argumentList = require('../argumentList.js');
var generator = require('./generator.js');

var makeIdentifier = function(str) {
  return {
    label: 'identifier',
    value: str
  };
};

generator('argumentList', argumentList, {
  valid: [
    ['()', []],
    ['(a, b)', ['a', 'b'].map(makeIdentifier)],
    ['(x)', ['x'].map(makeIdentifier)],
    ['(a,b)', ['a', 'b'].map(makeIdentifier)],
    ['( a , b )', ['a', 'b'].map(makeIdentifier)],
    [
      '(one, two, three, four, five)',
      ['one', 'two', 'three', 'four', 'five'].map(makeIdentifier)
    ],
    [
      '(six,seven , eight,nine ,ten)',
      ['six', 'seven', 'eight', 'nine', 'ten'].map(makeIdentifier)
    ]
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
