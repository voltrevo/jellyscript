'use strict';

var number = require('../number.js');
var generator = require('./generator.js');

generator('number', number, {
  valid: [
    ['0'],
    ['1'],
    ['2'],
    ['3'],
    ['4'],
    ['5'],
    ['6'],
    ['7'],
    ['8'],
    ['9'],
    ['21873659235'],
    ['0.3'],
    ['.3'],
    ['123e5'],
    ['-1'],
    ['-478349'],
    ['-86e-32'],
    ['-7.401e61']
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
    ['()'],
    ['7u'],
    [' 1'],
    ['1 '],
    ['(1)'],
    ['--3'],
    ['3-'],
    ['1e1.1']
  ]
});
