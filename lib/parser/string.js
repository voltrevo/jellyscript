'use strict';

var assert = require('assert');
var parser = require('voltrevo-parser').flat;

var flatten = require('./flatten.js');

var string = {};

string.raw = parser.name('string.raw', parser.sequence(
  parser.single('\''),
  parser.many(
    parser.or(
      parser.if(function(element) {
        return /^[^\\']$/.test(element);
      }),
      parser.sequence(
        parser.single('\\'),
        parser.any
      )
    )
  ),
  parser.single('\'')
));

string.returnCode = parser.name('string.returnCode', parser.transform(
  string.raw,
  function(result) {
    return flatten(result);
  }
));

string.returnContent = parser.name('string.returnContent', parser.transform(
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
