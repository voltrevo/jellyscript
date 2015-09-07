'use strict';

var parser = require('parser');

module.exports = function() {
  var codeBlock = require('./codeBlock.js');
  var expression = require('./expression');
  var makeBlock = require('./makeBlock.js');

  var singleIf = parser.sequence(
    parser.string('if'),
    parser.optionalWhitespace,
    parser.layer(
      makeBlock('(', ')'),
      parser.wrapOptionalWhitespace(expression)
    ),
    parser.optionalWhitespace,
    codeBlock
  );

  var if_ = parser.sequence(
    singleIf,
    parser.many(parser.sequence(
      parser.optionalWhitespace,
      parser.string('else'),
      parser.whitespace,
      singleIf
    )),
    parser.optional(parser.sequence(
      parser.wrapOptionalWhitespace(parser.string('else')),
      codeBlock
    ))
  );

  return if_.apply(this, arguments);
};
