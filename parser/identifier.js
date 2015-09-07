'use strict';

// TODO: Should keywords be invalid identifiers?

var parser = require('parser');

module.exports = parser.transform(
  parser.constrain(
    parser.oneOrMore(
      parser.regexChar(/^[a-zA-Z0-9_]$/)
    ),
    function(value) {
      return !/^[0-9]$/.test(value[0]);
    }
  ),
  function(value) {
    return value.join('');
  }
);
