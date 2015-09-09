'use strict';

var expression = require('./expression');
var parser = require('parser');
var returnKeyword = require('./returnKeyword.js');
var semicolon = require('./semicolon.js');

module.exports = parser.type('returnStatement', parser.transform(
  parser.sequence(
    returnKeyword,
    parser.whitespace,
    expression,
    parser.optionalWhitespace,
    semicolon
  ),
  function(res) {
    return res[2];
  }
));
