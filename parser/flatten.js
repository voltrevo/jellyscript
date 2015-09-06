'use strict';

var flatten = function(arr) {
  var result = [];

  arr.forEach(function(el) {
    if (Array.isArray(el)) {
      result = result.concat(flatten(el));
    } else {
      result.push(el);
    }
  });

  return result;
};

module.exports = flatten;
