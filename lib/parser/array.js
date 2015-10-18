'use strict';

var parser = require('voltrevo-parser').flat;

var comma = require('./comma.js');
var expression = require('./expression');

module.exports = parser.name('array', parser.transform(
  parser.sequence(
    parser.single('['),
    parser.list(
      parser.wrapOptionalWhitespace(expression),
      comma
    ),
    parser.single(']')
  ),
  function(res) {
    return res[1];
  }
));
