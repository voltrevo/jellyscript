'use strict';

var parser = require('parser');

var comma = require('./comma.js');
var identifier = require('./identifier.js');
var makeBlock = require('./makeBlock.js');

module.exports = parser.layer(
  makeBlock('(', ')'),
  parser.wrapOptionalWhitespace(
    parser.list(
      identifier,
      parser.wrapOptionalWhitespace(comma)
    )
  )
);
