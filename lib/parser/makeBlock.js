'use strict';

var parser = require('voltrevo-parser').flat;

var string = require('./string.js');

module.exports = function(openStr, closeStr) {
  return parser.block(
    parser.string(openStr),
    string.returnCode,
    parser.string(closeStr)
  );
};
