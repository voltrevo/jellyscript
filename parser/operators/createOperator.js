'use strict';

var assert = require('assert');
var parser = require('parser');

module.exports = function(name, str, arity, associativity) {
  assert(['left-to-right', 'right-to-left'].indexOf(associativity) !== -1);

  return {
    name: name,
    str: str,
    consumer: parser.transform(
      parser.string(str),
      function() {
        return {
          type: 'operator-token',
          name: name
        };
      }
    ),
    arity: arity,
    associativity: associativity
  };
};
