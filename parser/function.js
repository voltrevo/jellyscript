'use strict';

var parser = require('parser');

var funcKeyword = require('./funcKeyword.js');

module.exports = parser.sequence(
  parser.wrapOptionalWhitespace(funcKeyword),
  parser.optional(argumentList),
  parser.labelledOr(
    ['expressionBody', parser.sequence(
      arrow,
      expression
    )],
    ['blockBody', codeBlock]
  )
);
