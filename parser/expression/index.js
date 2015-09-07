'use strict';

var parser = require('parser');

var rawExpression = require('./rawExpression.js');
var operators = require('../operators');
var precedenceGrouper = require('./precedenceGrouper.js');

module.exports = parser.constrain(
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
