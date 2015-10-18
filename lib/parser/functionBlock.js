'use strict';

var parser = require('voltrevo-parser').flat;

var codeBlock = require('./codeBlock.js');

module.exports = parser.constrainAcceptance(
  codeBlock,
  function(parsedCodeBlock) {
    var isReturnMap = parsedCodeBlock.map(function(statement) {
      return statement.label === 'returnStatement';
    });

    var lastIsReturn = isReturnMap.pop();

    if (!lastIsReturn) {
      return false;
    }

    return isReturnMap.every(function(isReturn) {
      return !isReturn;
    });
  }
);
