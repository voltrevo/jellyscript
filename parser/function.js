'use strict';

module.exports = function() {
  var parser = require('parser');

  var argumentList = require('./argumentList.js');
  var arrow = require('./arrow.js');
  var codeBlock = require('./codeBlock.js');
  var expression = require('./expression');
  var funcKeyword = require('./funcKeyword.js');

  var function_ = parser.sequence(
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

  return function_.apply(undefined, arguments);
};
