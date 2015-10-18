'use strict';

var parser = require('voltrevo-parser').flat;

var comma = require('../comma.js');
var expression = require('./index.js');
var makeBlock = require('../makeBlock.js');

module.exports = parser.transform(
  parser.pipe(
    makeBlock('(', ')'),
    parser.list(
      parser.wrapOptionalWhitespace(expression),
      comma
    )
  ),
  function(parsedList) {
    return {
      type: 'expression-list',
      value: parsedList
    };
  }
);
