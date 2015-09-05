'use strict';

var assignmentOperator = require('./assignmentOperator.js');
var expression = require('./expression.js');
var parser = require('parser');
var variableKeyword = require('./variableKeyword.js');

module.exports = parser.sequence(
  variableKeyword,
  parser.whitespace,
  assignmentOperator,
  expression
);
