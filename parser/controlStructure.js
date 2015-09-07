'use strict';

var parser = require('parser');

module.exports = function() {
  var codeBlock = require('./codeBlock.js');
  var expression = require('./expression');
  var makeBlock = require('./makeBlock.js');

  var controlStructure = parser.sequence(
    parser.or(
      parser.string('if'),
      parser.string('for')
    ),
    parser.optionalWhitespace,
    parser.layer(
      makeBlock('(', ')'),
      parser.wrapOptionalWhitespace(expression)
    ),
    parser.optionalWhitespace,
    codeBlock
  );

  return controlStructure.apply(this, arguments);
};
