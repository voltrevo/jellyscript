'use strict';

/* eslint-disable no-console */

var fs = require('fs');
var Stream = require('parser').stream;

var programParser = require('../lib/parser/functionBlock.js');

var fileContents = fs.readFileSync(process.argv[2]).toString();
var stream = new Stream('{' + fileContents + '}');

var parseResult = programParser(stream);

console.log(parseResult.success ? 'valid!' : 'not valid!');