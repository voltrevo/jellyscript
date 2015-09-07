'use strict';

var string = require('../string.js').raw;
var generator = require('./generator.js');

generator('string', string, {
  valid: [
    ['""'],
    ['"hello world!"'],
    ['" leading whitespace"'],
    ['"trailing whitespace "'],
    ['" leading and trailing whitespace "'],
    ['"escaped \\"quote"'],
    ['"escaped \\"quotes\\""'],
    ['"lots of escaped quotes\\"\\"\\"\\"\\"\\"\\"\\"\\""'],
    ['"escap\\ing other \\charac\\ters"']
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
    ['1e1.1'],
    ['"'],
    ['"""'],
    ['"incorrect escaping \\\\""'],
    [' "outside leading whitespace"'],
    ['"outside trailing whitespace" ']
  ]
});
