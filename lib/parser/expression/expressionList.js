'use strict';

var parser = require('parser');

var comma = require('../comma.js');
var expression = require('./index.js');
var makeBlock = require('../makeBlock.js');

module.exports = parser.transform(
  parser.layer(
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
