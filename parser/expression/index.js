'use strict';

var parser = require('parser');

var rawExpression = require('./rawExpression.js');
var operators = require('../operators');
var precedenceGrouper = require('./precedenceGrouper.js');

module.exports = parser.transform(
  rawExpression,
  precedenceGrouper(operators.groups)
);
