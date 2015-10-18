'use strict';

var Stream = require('voltrevo-parser').flat.Stream;

var functionCallParser = require('./functionCallParser.js');

module.exports = function(tokens) {
  var stream = Stream(tokens);
  return functionCallParser.consume(stream);
};
