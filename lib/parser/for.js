'use strict';

var parser = require('voltrevo-parser').flat;

module.exports = parser.defer('for', function() {
  var codeBlock = require('./codeBlock.js');
  var expression = require('./expression');
  var makeBlock = require('./makeBlock.js');

  return parser.sequence(
    parser.string('for'),
    parser.many(parser.whitespace),
    parser.optional(parser.pipe(
      makeBlock('(', ')'),
      parser.wrapOptionalWhitespace(expression)
    )),
    parser.many(parser.whitespace),
    codeBlock
  );
});
