'use strict';

var parser = require('parser');

module.exports = parser.type('boolean', parser.transform(
  parser.or(
    parser.string('true'),
    parser.string('false')
  ),
  function(arr) {
    return arr[0] === 't';
  }
));
