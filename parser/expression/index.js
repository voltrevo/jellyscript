'use strict';

var assert = require('assert');
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
        assert(operators.groups[0][0].name === 'dot');

        var dottedTokens = precedenceGrouper(
          operators.groups.slice(0, 1),
          tokens,
          function(token) {
            return 'type' in token && token.type === 'operator-token';
          }
        );

        if (dottedTokens === undefined) {
          return undefined;
        }

        var fnGroupedTokens = functionCallGrouper(dottedTokens);

        if (!fnGroupedTokens.success) {
          return undefined;
        }

        var expr = precedenceGrouper(
          operators.groups.slice(1),
          fnGroupedTokens.value,
          function(token) {
            return 'type' in token && token.type === 'operator-token';
          }
        );

        if (expr === undefined || expr.length > 1) {
          return undefined;
        }

        return expr[0];
      }
    ),
    function(expr) {
      return expr !== undefined;
    }
  ));

  return expression.apply(this, arguments);
};
