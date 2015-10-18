'use strict';

var parser = require('voltrevo-parser').flat;

module.exports = parser.name('boolean', parser.transform(
  parser.or(
    parser.string('true'),
    parser.string('false')
  ),
  function(arr) {
    return arr[0] === 't';
  }
));
