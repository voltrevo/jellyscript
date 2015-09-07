'use strict';

var parser = require('parser');

// TODO: This is a dummy implementation that throws an error for if/for instead of actually parsing.
module.exports = parser.constrain(
  parser.or(
    parser.string('if'),
    parser.string('for')
  ),
  function() {
    throw new Error('control structures not yet unimplemented');
  }
);
