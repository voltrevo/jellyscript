'use strict';

var parse = require('parser');

module.exports = parser.or(
  parser.char('='),
  parser.char('~')
);
