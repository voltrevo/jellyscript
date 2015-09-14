'use strict';

var value = require('../value.js');
var generator = require('./generator.js');

generator('value', value, {
  valid: [
    ['true', { type: 'boolean', value: true }],

    ['func => nil', {
      type: 'function',
      value: {
        args: [],
        body: [{
          type: 'returnStatement',
          value: {
            type: 'nil',
            value: 'nil'
          }
        }]
      }
    }],

    ['foobar', { type: 'identifier', value: 'foobar' }],
    ['nil', { type: 'nil', value: 'nil' }],
    ['42', { type: 'number', value: 42 }],
    ['"bluey"', { type: 'string', value: 'bluey' }]
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
    ['() ']
  ]
});
