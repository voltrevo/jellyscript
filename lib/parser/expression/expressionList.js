'use strict';

var parser = require('voltrevo-parser').flat;

var comma = require('../comma.js');
var expression = require('./index.js');
var makeBlock = require('../makeBlock.js');

module.exports = parser.name('expressionList', parser.transform(
  parser.pipe(
    makeBlock('(', ')'),
    parser.list(
      parser.wrapOptionalWhitespace(expression),
      comma
    )
  ),
  function(parsedList) {
    return {
      label: 'expression-list',
      value: parsedList
    };
  }
));
