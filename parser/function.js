'use strict';

module.exports = function() {
  var parser = require('parser');

  var argumentList = require('./argumentList.js');
  var arrow = require('./arrow.js');
  var functionBlockBody = require('./functionBlockBody.js');
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
      ['blockBody', functionBlockBody]
    )
  );

  return function_.apply(undefined, arguments);
};
