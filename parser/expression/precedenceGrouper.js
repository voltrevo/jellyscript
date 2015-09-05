'use strict';

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
  var result = [];
  var length = arrView.length();

  for (var i = 0; i !== length; i++) {
    result.push(arrView.get(i));
  }

  return result;
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

module.exports = function(operatorGroups, tokens) {

  for (var i = 0; i !== operatorGroups.length; i++) {

  }
};

/*

var grouped = precedenceGrouper(
  [
    ['.'],
    ['=', '~'],
    ['*', '/', '%'],
    ['+', '-']
  ],
  [
      {type: 'operator', value: '+'},
      {type: 'value', value: [['any']]}
  ]
]);

*/
