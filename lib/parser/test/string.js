'use strict';

var string = require('../string.js').returnContent;
var generator = require('./generator.js');

generator('string', string, {
  valid: [
    ['""', ''],
    ['"hello world!"', 'hello world!'],
    ['" leading whitespace"', ' leading whitespace'],
    ['"trailing whitespace "', 'trailing whitespace '],
    [
      '" leading and trailing whitespace "',
      ' leading and trailing whitespace '
    ],
    ['"escaped \\"quote"', 'escaped "quote'],
    ['"escaped \\"quotes\\""', 'escaped "quotes"'],
    [
      '"lots of escaped quotes\\"\\"\\"\\"\\"\\"\\"\\"\\""',
      'lots of escaped quotes"""""""""'
    ],
    ['"escap\\ing other \\charac\\ters"', 'escaping other characters']
  ].map(function(inputOutput) {
    return [
      inputOutput[0],
      {
        type: 'string',
        value: inputOutput[1]
      }
    ];
  }),
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
