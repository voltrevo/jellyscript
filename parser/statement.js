'use strict';

var parser = require('parser');

var expression = require('./expression.js');
var semicolon = require('./semicolon.js');

module.exports = parser.labelledOr(
  ['expression', parser.sequence(expression, semicolon)],
  ['controlStructure', controlStructure],
  ['returnStatement', returnStatement]
);
