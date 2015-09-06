'use strict';

var parser = require('parser');

var operators = require('../operators');
var rvalue = require('../rvalue.js');

module.exports = parser.sequence(
  parser.many(
    parser.wrapOptionalWhitespace(parser.or(
      rvalue,
      operators.any
    ))
  )
);
