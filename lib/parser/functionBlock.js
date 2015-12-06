'use strict';

var parser = require('voltrevo-parser').flat;

var codeBlock = require('./codeBlock.js');

module.exports = parser.name('functionBlock', parser.transform(
  parser.constrainAcceptance(
    codeBlock,
    function(parsedCodeBlock) {
      var isReturnMap = parsedCodeBlock.map(function(statement) {
        return statement.label === 'returnStatement';
      });

      isReturnMap.pop(); // last statement can be a return

      return isReturnMap.every(function(isReturn) {
        return !isReturn;
      });
    }
  ),
  function(parsedCodeBlock) {
    if (
      parsedCodeBlock.length === 0 ||
      parsedCodeBlock[parsedCodeBlock.length - 1].label !== 'returnStatement'
    ) {
      parsedCodeBlock.push({
        label: 'returnStatement',
        value: 'nil'
      });
    }

    return parsedCodeBlock;
  }
));
