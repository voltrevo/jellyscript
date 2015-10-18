'use strict';

var parser = require('voltrevo-parser').flat;

var expressionList = require('./expressionList.js');
var operators = require('../operators');
var value = require('../value.js');

module.exports = parser.name('rawExpression', parser.constrainAcceptance(
  parser.list(
    parser.or(
      value,
      expressionList,

      // TODO: There's a theoretical issue here where the exact operator actually can't be
      // determined at this step of the parser. For example in `1 + 1`, the `+` will be identified
      // as a unary-plus, but when constructing the expression tree later (precedenceGrouper) it is
      // found to be a binary-plus because there is a value to its left.
      operators.any
    ),
    parser.many(parser.whitespace)
  ),
  function(value) {
    return value.length >= 1;
  }
));
