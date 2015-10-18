'use strict';

var parser = require('voltrevo-parser').flat;

var comma = require('./comma.js');
var identifier = require('./identifier.js');
var makeBlock = require('./makeBlock.js');

module.exports = parser.name('argumentList', parser.pipe(
  makeBlock('(', ')'),
  parser.wrapOptionalWhitespace(
    parser.list(
      identifier,
      parser.wrapOptionalWhitespace(comma)
    )
  )
));
