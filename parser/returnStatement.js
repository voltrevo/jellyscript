'use strict';

var expression = require('./expression.js');
var parser = require('parser');
var returnKeyword = require('./returnKeyword.js');
var semicolon = require('./semicolon.js');

module.exports = parser.sequence(
  returnKeyword,
  parser.whitespace,
  expression,
  semicolon
);
