'use strict';

var parser = require('parser');

module.exports = function() {
  var codeBlock = require('./codeBlock.js');
  var expression = require('./expression');
  var makeBlock = require('./makeBlock.js');

  var for_ = parser.sequence(
    parser.string('for'),
    parser.optionalWhitespace,
    parser.optional(parser.layer(
      makeBlock('(', ')'),
      parser.wrapOptionalWhitespace(expression)
    )),
    parser.optionalWhitespace,
    codeBlock
  );

  return for_.apply(this, arguments);
};
