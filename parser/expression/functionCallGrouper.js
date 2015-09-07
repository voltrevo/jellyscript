'use strict';

var Stream = require('parser').stream;

var functionCallParser = require('./functionCallParser.js');

module.exports = function(tokens) {
  var stream = new Stream(tokens);
  return functionCallParser(stream);
};
