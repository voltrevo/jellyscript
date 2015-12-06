'use strict';

var parser = require('voltrevo-parser').flat;

var expression = require('./index.js');
var makeBlock = require('../makeBlock.js');

module.exports = parser.name('functionInput', parser.transform(
  parser.pipe(
    makeBlock('(', ')'),
    parser.optional(parser.wrapOptionalWhitespace(expression))
  ),
  function(parsedFunctionInput) {
    return {
      label: 'function-input',
      value: parsedFunctionInput.set ? parsedFunctionInput.value : 'implicit-nil'
    };
  }
));
