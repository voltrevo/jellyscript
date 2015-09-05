'use strict';

module.exports = parser.labelledOr(
  ['number', number],
  ['string', string],
  ['function', function_],
  ['identifier', identifier],
  ['boolean', boolean]
);
