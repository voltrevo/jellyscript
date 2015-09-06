'use strict';

var parser = require('parser');

module.exports = parser.or(
  parser.string('true'),
  parser.string('false')
);
