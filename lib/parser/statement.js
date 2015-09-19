'use strict';

var parser = require('parser');

var controlStructure = require('./controlStructure.js');
var expression = require('./expression');
var returnStatement = require('./returnStatement.js');
var semicolon = require('./semicolon.js');

module.exports = parser.or(
  returnStatement,
  parser.transform(
    parser.sequence(expression, parser.optionalWhitespace, semicolon),
    function(res) {
      return res[0];
    }
  ),
  controlStructure
);
