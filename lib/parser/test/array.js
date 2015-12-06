'use strict';

var array = require('../array.js');
var generator = require('./generator.js');

generator('array', array, {
  valid: [
    ['[]'],
    ['[[[[[]]]]]'],
    ['[1, 2, 3]'],
    ['[1, \'two\', 3.0, [\'four\']]']
  ],
  invalid: [
    [''],
    [' =>'],
    ['=> '],
    ['==>'],
    [' []'],
    ['[] '],
    ['[,]'],
    ['[,,]'],
    ['[1,]'],
    ['[,1]'],
    ['[[]'],
    ['[]]']
  ]
});
