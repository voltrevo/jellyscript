'use strict';

var parser = require('parser');

// TODO: strings mess this up

module.exports = parser.block(
  parser.char('{'),
  parser.char('}')
);
