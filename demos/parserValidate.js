'use strict';

/* eslint-disable no-console */

var fs = require('fs');
var Stream = require('voltrevo-parser').flat.Stream;

var programParser = require('../lib/parser/functionBlock.js');

var fileContents = fs.readFileSync(process.argv[2]).toString();
var stream = Stream('{' + fileContents + '}');

var parseResult = programParser(stream);

console.log(parseResult.valid ? 'valid!' : 'not valid!');
