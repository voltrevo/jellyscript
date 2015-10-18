'use strict';

var expression = require('./expression');
var parser = require('voltrevo-parser').flat;
var returnKeyword = require('./returnKeyword.js');
var semicolon = require('./semicolon.js');

module.exports = parser.name('returnStatement', parser.transform(
  parser.sequence(
    returnKeyword,
    parser.whitespace,
    expression,
    parser.many(parser.whitespace),
    semicolon
  ),
  function(res) {
    return res[2].value;
  }
));
