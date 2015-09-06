'use strict';

var parser = require('parser');

var string = require('./string.js');

module.exports = function(openStr, closeStr) {
  return parser.block(
    parser.string(openStr),
    parser.or(
      string.returnCode,
      parser.any
    ),
    parser.string(closeStr)
  );
};
