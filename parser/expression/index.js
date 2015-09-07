'use strict';

var parser = require('parser');

var operators = require('../operators');
var precedenceGrouper = require('./precedenceGrouper.js');

module.exports = function() {
  // Expression is wrapped like this because of the mutual dependency between expression and
  // rawExpression.
  var rawExpression = require('./rawExpression.js');

  var expression = parser.constrain(
    parser.transform(
      rawExpression,
      function(tokens) {
        return precedenceGrouper(
          operators.groups,
          tokens,
          function(token) {
            return 'type' in token && token.type === 'operator-token';
          }
        );
      }
    ),
    function(expr) {
      return expr !== undefined;
    }
  );

  return expression.apply(this, arguments);
};
