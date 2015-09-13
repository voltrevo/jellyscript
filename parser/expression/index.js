'use strict';

var parser = require('parser');

var functionCallGrouper = require('./functionCallGrouper.js');
var operators = require('../operators');
var precedenceGrouper = require('./precedenceGrouper.js');

module.exports = function() {
  // Expression is wrapped like this because of the mutual dependency between expression and
  // rawExpression.
  var rawExpression = require('./rawExpression.js');

  var expression = parser.type('expression', parser.constrain(
    parser.transform(
      rawExpression,
      function(tokens) {
        var fnGroupedTokens = functionCallGrouper(tokens);

        if (!fnGroupedTokens.success) {
          return undefined;
        }

        return precedenceGrouper(
          operators.groups,
          fnGroupedTokens.value,
          function(token) {
            return 'type' in token && token.type === 'operator-token';
          }
        );
      }
    ),
    function(expr) {
      return expr !== undefined;
    }
  ));

  return expression.apply(this, arguments);
};
