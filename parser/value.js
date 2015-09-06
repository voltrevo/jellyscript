'use strict';

var parser = require('parser');

var boolean = require('./boolean.js');
var function_ = require('./function.js');
var identifier = require('./identifier.js');
var nil = require('./nil.js');
var number = require('./number.js');
var string = require('./string.js');

module.exports = parser.labelledOr(
  ['boolean', boolean],
  ['function', function_],
  ['identifier', identifier],
  ['nil', nil],
  ['number', number],
  ['string', string]
);
