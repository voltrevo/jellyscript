'use strict';

var parser = require('parser');

var for_ = require('./for.js');
var if_ = require('./if.js');

module.exports = parser.type(
  'controlStructure',
  parser.or(
    for_,
    if_
  )
);
