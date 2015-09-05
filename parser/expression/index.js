'use strict';

module.exports = parser.transform(
  rawExpression,
  precedenceGrouper(operators.groups)
);
