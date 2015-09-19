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

module.exports = function(openStr, closeStr) {
  return parser.transform(
    parser.block(
      parser.string(openStr),
      parser.or(
        string.returnCode,
        parser.any
      ),
      parser.string(closeStr)
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
