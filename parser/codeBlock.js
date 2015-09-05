'use strict';

var parser = require('parser');

module.exports = parser.block(
  parser.char('{'),
  parser.char('}')
);
