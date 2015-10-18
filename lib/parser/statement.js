'use strict';

var parser = require('voltrevo-parser').flat;

var controlStructure = require('./controlStructure.js');
var expression = require('./expression');
var returnStatement = require('./returnStatement.js');
var semicolon = require('./semicolon.js');

module.exports = parser.name('statement', parser.or(
  returnStatement,
  parser.transform(
    parser.sequence(expression, parser.many(parser.whitespace), semicolon),
    function(res) {
      return res[0];
    }
  ),
  controlStructure
));
