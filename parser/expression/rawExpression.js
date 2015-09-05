'use strict';

var parser = require('parser');

var operator = require('../operator.js');
var rvalue = require('../rvalue.js');

module.exports = parser.sequence(
  parser.many(
    parser.wrapOptionalWhitespace(parser.labelledOr(
      ['rvalue', rvalue],
      ['operator', operator]
    ))
  )
);
