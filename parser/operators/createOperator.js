'use strict';

var assert = require('assert');
var parser = require('parser');

module.exports = function(name, str, arity, associativity) {
  assert(['left-to-right', 'right-to-left'].indexOf(associativity) !== -1);

  return {
    name: name,
    consumer: parser.string(str),
    arity: arity,
    associativity: associativity
  }
};
