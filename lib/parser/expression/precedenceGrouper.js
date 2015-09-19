'use strict';

var assert = require('assert');

var arrayView = function(arr) {
  return {
    get: function(n) { return arr[n]; },
    length: function() { return arr.length; }
  };
};

var reverse = function(arrView) {
  return {
    get: function(n) { return arrView.get(arrView.length() - n - 1); },
    length: arrView.length
  };
};

var toArray = function(arrView) {
  var res = [];
  var len = arrView.length();

  for (var i = 0; i !== len; i++) {
    res.push(arrView.get(i));
  }

  return res;
};

var unaryPass = function(opTest, valTest, makeOp, sequence) {
  var result = [];
  var last = function() { return result[result.length - 1]; };
  var length = sequence.length();

  for (var i = 0; i !== length; i++) {
    var curr = sequence.get(i);
    var currOp = opTest(curr);
    var next = (i + 1 < length ? sequence.get(i + 1) : undefined);

    if (
      currOp !== undefined &&
      (next === undefined || !valTest(next)) &&
      !(i === 0 || !valTest(last()))
    ) {
      result.push(makeOp(result.pop(), currOp));
    } else {
      result.push(curr);
    }
  }

  return result;
};

var binaryPass = function(opTest, valTest, makeOp, sequence) {
  var result = [];
  var last = function() { return result[result.length - 1]; };
  var length = sequence.length();

  for (var i = 0; i < length; i++) {
    var curr = sequence.get(i);
    var currOp = opTest(curr);

    if (currOp !== undefined && i + 1 < length) {
      var next = sequence.get(i + 1);

      if (i === 0 || !valTest(last()) || !valTest(next)) {
        // TODO: Not sure whether this is the theoretically the right thing to do or whether it
        // happens to do the right thing because of the specific operator precedence set being used.
        // It could be that this should give operators of lower precedence an opportunity to
        // construct the expression after unary operators have left values on both sides.
        return undefined;
      }

      result.push(makeOp(result.pop(), currOp, next));
      i++;
    } else {
      result.push(curr);
    }
  }

  return result;
};

module.exports = function(operatorGroups, tokens, opTest) {
  var valTest = function(token) {
    return !opTest(token);
  };

  var expr = operatorGroups.reduce(
    function(prevTokens, opGroup) {
      if (prevTokens === undefined) {
        return undefined;
      }

      assert(prevTokens.length() >= 1);
      assert(opGroup.length >= 1);

      var associativity = opGroup[0].associativity;
      var arity = opGroup[0].arity;

      assert(opGroup.every(function(op) {
        return (
          op.associativity === associativity &&
          op.arity === arity
        );
      }));

      assert(
        associativity === 'left-to-right' ||
        associativity === 'right-to-left'
      );

      assert(arity === 1 || arity === 2);

      var pass = (arity === 1 ? unaryPass : binaryPass);

      var makeOp = (arity === 1 ?
        function(val, op) {
          return {
            type: 'unary-operation',
            value: {
              op: op.name,
              arg: val
            }
          };
        } :
        (associativity === 'left-to-right' ?
          function(lval, op, rval) {
            return {
              type: 'binary-operation',
              value: {
                op: op.name,
                args: [lval, rval]
              }
            };
          } :
          function(rval, op, lval) {
            return {
              type: 'binary-operation',
              value: {
                op: op.name,
                args: [lval, rval]
              }
            };
          }
        )
      );

      var opGroupTest = function(token) {
        if (!opTest(token)) {
          return undefined;
        }

        var actualOp = undefined;

        opGroup.forEach(function(op) {
          if (op.str === token.str) {
            assert(actualOp === undefined);
            actualOp = op;
          }
        });

        return actualOp;
      };

      var passed = undefined;

      if (associativity === 'right-to-left') {
        var revTokens = reverse(prevTokens);
        passed = pass(opGroupTest, valTest, makeOp, revTokens);
        return passed && reverse(arrayView(passed));
      }

      passed = pass(opGroupTest, valTest, makeOp, prevTokens);
      return passed && arrayView(passed);
    },
    arrayView(tokens)
  );

  if (expr === undefined) {
    return undefined;
  }

  assert(expr.length() >= 1);

  return toArray(expr);
};
