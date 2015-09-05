'use strict';

var createOperator = require('./createOperator.js');

module.exports = [
  [
    ['dot',              '.',  2, 'left-to-right'],
  ], [
    ['post-increment',   '++', 1, 'left-to-right'],
    ['post-decrement',   '--', 1, 'left-to-right'],
  ], [
    ['pre-increment',    '++', 1, 'right-to-left'],
    ['pre-decrement',    '--', 1, 'right-to-left'],
    ['unary-plus',       '+',  1, 'right-to-left'],
    ['unary-minus',      '-',  1, 'right-to-left'],
    ['not',              '!',  1, 'right-to-left'],
  ], [
    ['multiply',         '*',  2, 'left-to-right'],
    ['divide',           '/',  2, 'left-to-right'],
    ['modulus',          '%',  2, 'left-to-right'],
  ], [
    ['plus',             '+',  2, 'left-to-right'],
    ['minus',            '-',  2, 'left-to-right'],
  ], [
    ['less',             '<',  2, 'left-to-right'],
    ['greater',          '>',  2, 'left-to-right'],
    ['less-or-equal',    '<=', 2, 'left-to-right'],
    ['greater-or-equal', '>=', 2, 'left-to-right'],
  ], [
    ['equal',            '==', 2, 'left-to-right'],
    ['not-equal',        '!=', 2, 'left-to-right'],
  ], [
    ['and',              '&&', 2, 'left-to-right'],
  ], [
    ['or',               '||', 2, 'left-to-right'],
  ], [
    ['mutate',           '~',  2, 'right-to-left'],
    ['plus-mutate',      '+~', 2, 'right-to-left'],
    ['minus-mutate',     '-~', 2, 'right-to-left'],
    ['multiply-mutate',  '*~', 2, 'right-to-left'],
    ['divide-mutate',    '/~', 2, 'right-to-left'],
    ['modulus-mutate',   '%~', 2, 'right-to-left'],
  ]
].map(function(group) {
  return group.map(function(operatorArgs) {
    return createOperator.apply(undefined, operatorArgs);
  });
});
