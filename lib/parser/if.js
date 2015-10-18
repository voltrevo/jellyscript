'use strict';

var parser = require('voltrevo-parser').flat;

module.exports = parser.defer('if', function() {
  var codeBlock = require('./codeBlock.js');
  var expression = require('./expression');
  var makeBlock = require('./makeBlock.js');

  var singleIf = parser.sequence(
    parser.string('if'),
    parser.many(parser.whitespace),
    parser.pipe(
      makeBlock('(', ')'),
      parser.wrapOptionalWhitespace(expression)
    ),
    parser.many(parser.whitespace),
    codeBlock
  );

  return parser.sequence(
    singleIf,
    parser.many(parser.sequence(
      parser.many(parser.whitespace),
      parser.string('else'),
      parser.oneOrMore(parser.whitespace),
      singleIf
    )),
    parser.optional(parser.sequence(
      parser.wrapOptionalWhitespace(parser.string('else')),
      codeBlock
    ))
  );
});
