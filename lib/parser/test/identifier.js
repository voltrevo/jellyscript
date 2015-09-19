'use strict';

var identifier = require('../identifier.js');
var generator = require('./generator.js');

generator('identifier', identifier, {
  valid: [
    ['foo'],
    ['bar'],
    ['one1'],
    ['two2'],
    ['_lightning_cat_'],
    ['__x'],
    ['_372865923']
  ],
  invalid: [
    [''],
    [' =>'],
    ['=> '],
    ['==>'],
    [' true'],
    [' true '],
    ['false '],
    ['&'],
    ['37'],
    ['1one'],
    [' foo'],
    ['()']
  ]
});
