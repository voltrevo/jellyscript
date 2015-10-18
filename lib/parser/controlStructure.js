'use strict';

var parser = require('voltrevo-parser').flat;

var for_ = require('./for.js');
var if_ = require('./if.js');

module.exports = parser.name(
  'controlStructure',
  parser.or(
    for_,
    if_
  )
);
