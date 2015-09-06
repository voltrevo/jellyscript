'use strict';

var parser = require('parser');

var controlStructure = require('./controlStructure.js');
var expression = require('./expression');
var returnStatement = require('./returnStatement.js');
var semicolon = require('./semicolon.js');

module.exports = parser.labelledOr(
  ['expression', parser.sequence(expression, semicolon)],
  ['controlStructure', controlStructure],
  ['returnStatement', returnStatement]
);
