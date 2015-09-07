'use strict';

var boolean = require('../boolean.js');
var generator = require('./generator.js');

generator('boolean', boolean, {
  valid: [
    ['true'],
    ['false']
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
