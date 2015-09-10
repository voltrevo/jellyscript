'use strict';

var assert = require('assert');
var parser = require('parser');

var flatten = require('./flatten.js');

var string = {};

string.raw = parser.sequence(
  parser.char('"'),
  parser.many(
    parser.or(
      parser.regexChar(/^[^\\"]$/),
      parser.sequence(
        parser.char('\\'),
        parser.any
      )
    )
  ),
  parser.char('"')
);

string.returnCode = parser.transform(
  string.raw,
  function(result) {
    return flatten(result);
  }
);

string.returnContent = parser.type('string', parser.transform(
  string.raw,
  function(result) {
    assert(result.length === 3);

    return result[1].map(function(chunk) {
      if (typeof chunk === 'string') {
        return chunk;
      }

      assert(Array.isArray(chunk) && chunk.length === 2 && chunk[0] === '\\');
      return chunk[1];
    }).join('');
  }
));

module.exports = string;
