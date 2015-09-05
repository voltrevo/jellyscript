'use strict';

var expression = require('./expression.js');
var parser = require('parser');
var semicolon = require('./semicolon.js');

module.exports = parser.labelledOr(
  ['expression', parser.sequence(expression, semicolon)],
  ['varDeclaration', parser.sequence(varDeclaration, semicolon)],
  ['controlStructure', controlStructure],
  ['returnStatement', parser.sequence(
    returnKeyword,
    parser.whitespace,
    expression,
    semicolon
  )]
);
