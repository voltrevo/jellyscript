'use strict';

module.exports = function() {
  var parser = require('parser');

  var argumentList = require('./argumentList.js');
  var arrow = require('./arrow.js');
  var codeBlock = require('./codeBlock.js');
  var expression = require('./expression');
  var funcKeyword = require('./funcKeyword.js');

  var function_ = parser.sequence(
    funcKeyword,
    parser.optionalWhitespace,
    parser.optional(argumentList),
    parser.optionalWhitespace,
    parser.labelledOr(
      ['expressionBody', parser.sequence(
        arrow,
        parser.optionalWhitespace,
        expression
      )],
      ['blockBody', parser.constrain(
        codeBlock,
        function(parsedCodeBlock) {
          if (parsedCodeBlock.length === 0) {
            return false;
          }

          var isReturnMap = parsedCodeBlock.map(function(statement) {
            return statement.label === 'returnStatement';
          });

          var lastIsReturn = isReturnMap.pop();

          if (!lastIsReturn) {
            return false;
          }

          return isReturnMap.every(function(isReturn) {
            return !isReturn;
          });
        }
      )]
    )
  );

  return function_.apply(undefined, arguments);
};
