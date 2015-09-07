'use strict';

var arrow = require('../arrow.js');
var generator = require('./generator.js');

generator('arrow', arrow, {
  valid: [
    ['=>']
  ],
  invalid: [
    [''],
    [' =>'],
    ['=> '],
    ['==>']
  ]
});
