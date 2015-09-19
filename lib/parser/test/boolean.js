'use strict';

var boolean = require('../boolean.js');
var generator = require('./generator.js');

generator('boolean', boolean, {
  valid: [
    ['true', { type: 'boolean', value: true }],
    ['false', { type: 'boolean', value: false }]
  ],
  invalid: [
    [''],
    [' =>'],
    ['=> '],
    ['==>'],
    [' true'],
    [' true '],
    ['false ']
  ]
});
