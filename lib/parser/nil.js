'use strict';

var parser = require('parser');

module.exports = parser.type('nil', parser.string('nil'));
