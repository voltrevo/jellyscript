'use strict';

var parser = require('parser');

module.exports = parser.sequence(
  parser.char('"'),
  parser.many(
    parser.or(
      parser.regexChar(/^[^\\"]$/),
      parser.sequence(
        parser.char('\\'),
        parser.any
      )
    )
  ),
  parser.char('"')
);
