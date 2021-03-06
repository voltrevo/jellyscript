'use strict';

var parser = require('voltrevo-parser').flat;

var makeBlock = require('./makeBlock.js');
var statement = require('./statement.js');

module.exports = parser.name('codeBlock', parser.pipe(
  makeBlock('{', '}'),
  parser.wrapOptionalWhitespace(parser.many(
    parser.wrapOptionalWhitespace(statement)
  ))
));
