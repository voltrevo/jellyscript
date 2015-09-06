'use strict';

var parser = require('parser');

var makeBlock = require('./makeBlock.js');
var statement = require('./statement.js');

module.exports = parser.layer(
  makeBlock('{', '}'),
  parser.many(statement)
);
