'use strict';

module.exports = function() {
  var parser = require('parser');

  var argumentList = require('./argumentList.js');
  var arrow = require('./arrow.js');
  var program = require('./program.js');
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
      ['blockBody', program]
    )
  );

  return function_.apply(undefined, arguments);
};
