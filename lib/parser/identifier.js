'use strict';

// TODO: Should keywords be invalid identifiers?

var parser = require('voltrevo-parser').flat;

module.exports = parser.name('identifier', parser.transform(
  parser.constrainValidity(
    parser.oneOrMore(
      parser.if(function(element) {
        return /^[a-zA-Z0-9_]$/.test(element);
      })
    ),
    function(value) {
      return !/^[0-9]$/.test(value[0]);
    }
  ),
  function(value) {
    return value.join('');
  }
));
