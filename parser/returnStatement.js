'use strict';

var expression = require('./expression.js');
var parser = require('parser');
var returnKeyword = require('./returnKeyword.js');

module.exports = parser.sequence(
  returnKeyword,
  parser.whitespace,
  expression,
  semicolon
);
