'use strict';

var parser = require('parser');

var array = require('./array.js');
var boolean = require('./boolean.js');
var function_ = require('./function.js');
var identifier = require('./identifier.js');
var nil = require('./nil.js');
var number = require('./number.js');
var object = require('./object.js');
var string = require('./string.js').returnContent;

module.exports = parser.labelledOr(
  ['array', array],
  ['boolean', boolean],
  ['function', function_],
  ['identifier', identifier],
  ['nil', nil],
  ['number', number],
  ['object', object],
  ['string', string]
);
