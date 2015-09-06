'use strict';

var parser = require('parser');

var operators = require('../operators');
var value = require('../value.js');

module.exports = parser.sequence(
  parser.many(
    parser.wrapOptionalWhitespace(parser.or(
      value,
      operators.any
    ))
  )
);
