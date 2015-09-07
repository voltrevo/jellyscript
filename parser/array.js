'use strict';

var parser = require('parser');

var comma = require('./comma.js');
var expression = require('./expression');

module.exports = parser.transform(
  parser.sequence(
    parser.char('['),
    parser.list(
      parser.wrapOptionalWhitespace(expression),
      comma
    ),
    parser.char(']')
  ),
  function(res) {
    return res[1];
  }
);
