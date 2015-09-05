'use strict';

var assignmentOperator = require('./assignmentOperator.js');
var parser = require('parser');

module.exports = parser.or(
  assignmentOperator,
  parser.char('+'),
  parser.char('-'),
  parser.char('*'),
  parser.char('/')
);
