'use strict';

var parser = require('parser');

var string = require('./string.js');

module.exports = parser.block(
  parser.char('{'),
  parser.or(
    string.returnCode,
    parser.any
  ),
  parser.char('}')
);
