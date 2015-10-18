'use strict';

var assert = require('assert');
var parser = require('voltrevo-parser').flat;

var functionCallGrouper = require('./functionCallGrouper.js');
var operators = require('../operators');
var precedenceGrouper = require('./precedenceGrouper.js');

module.exports = parser.defer('expression', function() {
  // Expression is wrapped like this because of the mutual dependency between expression and
  // rawExpression.
  var rawExpression = require('./rawExpression.js');

  return parser.name('expression', parser.constrainAcceptance(
    parser.transform(
      rawExpression,
      function(tokens) {
        assert(operators.groups[0][0].name === 'dot');

        var dottedTokens = precedenceGrouper(
          operators.groups.slice(0, 1),
          tokens,
          function(token) {
            return 'label' in token && token.label === 'operator-token';
          }
        );

        if (dottedTokens === undefined) {
          return undefined;
        }

        var fnGroupedTokens = functionCallGrouper(dottedTokens);

        if (!fnGroupedTokens.valid) {
          return undefined;
        }

        var expr = precedenceGrouper(
          operators.groups.slice(1),
          fnGroupedTokens.value,
          function(token) {
            return 'label' in token && token.label === 'operator-token';
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
});
