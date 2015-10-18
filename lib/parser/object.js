'use strict';

var parser = require('voltrevo-parser').flat;

var comma = require('./comma.js');
var expression = require('./expression');
var identifier = require('./identifier.js');
var string = require('./string.js').returnContent;

module.exports = parser.name('object', parser.sequence(
  parser.single('{'),
  parser.list(
    parser.wrapOptionalWhitespace(parser.sequence(
      parser.or(
        identifier,
        string
      ),
      parser.wrapOptionalWhitespace(parser.single(':')),
      expression
    )),
    comma
  ),
  parser.single('}')
));
