'use strict';

var assert = require('assert');
var parser = require('parser');
var Stream = parser.stream;

var string = require('./string.js');

var streamToArray = function(stream) {
  var arr = [];
  var restore = stream.mark();

  while (!stream.finished()) {
    arr.push(stream.next());
  }

  restore();

  return arr;
};

// TODO: shouldn't this be the default behaviour of parser.string?
var stringParser = function(str) {
  return parser.transform(
    parser.string(str),
    function(arr) {
      return arr.join('');
    }
  );
};

module.exports = function(openStr, closeStr) {
  return parser.transform(
    parser.block(
      stringParser(openStr),
      parser.or(
        string.returnCode,
        parser.any
      ),
      stringParser(closeStr)
    ),
    function(resParam) {
      // TODO: this is an unfortunate hack... there really should instead be a parser utility that
      // makes a consumer return the substream it consumed instead of its usual parsed structure.

      var res = streamToArray(resParam);
      assert(Array.isArray(res));

      var fixedContent = res.join('');

      return new Stream(fixedContent);
    }
  );
};
