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

var unaryPass = function(opTest, valTest, makeOp, sequence) {
  var result = [];
  var last = function() { return result[result.length - 1]; };
  var length = sequence.length();

  for (var i = 0; i !== length; i++) {
    var curr = sequence.get(i);

    if (opTest(curr)) {
      if (i === 0 || !valTest(last())) {
        return undefined;
      }

      result.push(makeOp(result.pop(), curr));
    } else {
      result.push(curr);
    }
  }

  return result;
};

var binaryPass = function(opTest, valTest, makeOp, sequence) {
  var result = [];
  var last = function() { return result[result.length - 1]; };
  var lengthM1 = sequence.length() - 1;

  for (var i = 0; i < lengthM1; i++) {
    var curr = sequence.get(i);

    if (opTest(curr)) {
      var next = sequence.get(i + 1);

      if (i === 0 || !valTest(last()) || !valTest(next)) {
        return undefined;
      }

      result.push(makeOp(result.pop(), curr, next));
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
        function(op, val) {
          return {
            type: 'expression',
            fn: op,
            args: [val]
          };
        } :
        function(lval, op, rval) {
          return {
            type: 'expression',
            fn: op,
            args: [lval, rval]
          };
        }
      );

      if (associativity === 'right-to-left') {
        var revTokens = reverse(prevTokens);
        var passed = pass(opTest, valTest, makeOp, revTokens);
        return reverse(arrayView(passed));
      }

      return pass(opTest, valTest, makeOp, tokens);
    },
    arrayView(tokens)
  );

  assert(expr.length() === 1);

  return expr.get(0);
};
