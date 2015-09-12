'use strict';

module.exports = function() {
  var parser = require('parser');

  var argumentList = require('./argumentList.js');
  var arrow = require('./arrow.js');
  var expression = require('./expression');
  var funcKeyword = require('./funcKeyword.js');
  var functionBlock = require('./functionBlock.js');

  var function_ = parser.type(
    'function',
    parser.transform(
      parser.sequence(
        funcKeyword,
        parser.optionalWhitespace,
        parser.optional(argumentList),
        parser.optionalWhitespace,
        parser.or(
          parser.type('expressionBody', parser.transform(
            parser.sequence(
              arrow,
              parser.optionalWhitespace,
              expression
            ),
            function(res) { return res[2]; }
          )),
          parser.type('blockBody', functionBlock)
        )
      ),
      function(res) {
        return {
          args: res[2].success ? res[2].value : [],
          body: res[4]
        };
      }
    )
  );

  return function_.apply(undefined, arguments);
};
