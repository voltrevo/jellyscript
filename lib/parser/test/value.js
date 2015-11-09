'use strict';

var value = require('../value.js');
var generator = require('./generator.js');

generator('value', value, {
  valid: [
    ['true', {label: 'boolean', value: true}],

    ['func => nil', {
      label: 'function',
      value: {
        args: [],
        body: [{
          label: 'returnStatement',
          value: {
            label: 'nil',
            value: 'nil'
          }
        }]
      }
    }],

    ['func => 0', {
      label: 'function',
      value: {
        args: [],
        body: [{
          label: 'returnStatement',
          value: {
            label: 'number',
            value: 0
          }
        }]
      }
    }],

    ['foobar', {label: 'identifier', value: 'foobar'}],
    ['nil', {label: 'nil', value: 'nil'}],
    ['42', {label: 'number', value: 42}],
    ['"bluey"', {label: 'string', value: 'bluey'}]
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
