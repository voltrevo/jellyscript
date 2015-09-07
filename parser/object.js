'use strict';

var parser = require('parser');

var comma = require('./comma.js');
var expression = require('./expression');
var identifier = require('./identifier.js');
var string = require('./string.js').returnContent;

module.exports = parser.sequence(
  parser.char('{'),
  parser.list(
    parser.wrapOptionalWhitespace(parser.sequence(
      parser.or(
        identifier,
        string
      ),
      parser.wrapOptionalWhitespace(parser.char(':')),
      expression
    )),
    comma
  ),
  parser.char('}')
);
