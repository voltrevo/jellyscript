'use strict';

var parser = require('parser');

var codeBlock = require('./codeBlock.js');

module.exports = parser.constrain(
  codeBlock,
  function(parsedCodeBlock) {
    if (parsedCodeBlock.length === 0) {
      return false;
    }

    var isReturnMap = parsedCodeBlock.map(function(statement) {
      return statement.type === 'returnStatement';
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
