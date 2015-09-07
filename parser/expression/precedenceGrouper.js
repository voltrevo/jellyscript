'use strict';

var assert = require('assert');

var arrayView = function(arr) {
  if (arr === undefined) {
    return undefined;
  }

  return {
    get: function(n) { return arr[n]; },
    length: function() { return arr.length; }
  };
};

var reverse = function(arrView) {
  if (arrView === undefined) {
    return undefined;
  }

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
    var currOp = opTest(curr);
    var next = (i + 1 < length ? sequence.get(i + 1) : undefined);

    if (currOp !== undefined && (next === undefined || !valTest(next))) {
      if (i === 0 || !valTest(last())) {
        return undefined;
      }

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

      if (associativity === 'right-to-left') {
        var revTokens = reverse(prevTokens);
        var passed = pass(opGroupTest, valTest, makeOp, revTokens);
        return reverse(arrayView(passed));
      }

      return arrayView(pass(opGroupTest, valTest, makeOp, prevTokens));
    },
    arrayView(tokens)
  );

  if (expr === undefined) {
    return undefined;
  }

  assert(expr.length() >= 1);

  if (expr.length() > 1) {
    return undefined;
  }

  return expr.get(0);
};
