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

module.exports = parser.or(
  array,
  boolean,
  function_,
  identifier,
  nil,
  number,
  object,
  string
);
