'use strict';

var parser = require('voltrevo-parser').flat;

var labelConstraint = function(label) {
  return function(token) {
    return 'label' in token && token.label === label;
  };
};

var operator = parser.if(
  labelConstraint('operator-token')
);

var functionInput = parser.if(
  labelConstraint('function-input')
);

var singleElementArray = parser.if(
  function(token) {
    var isArray = ('label' in token && token.label === 'array');
    return isArray && token.value.length === 1;
  }
);

var callParamsOrSubscript = parser.transform(
  parser.or(
    functionInput,
    singleElementArray
  ),
  function(token) {
    return (
      'label' in token && token.label === 'array' ? {
        label: 'subscript',
        value: token.value[0]
      } : {
        label: 'call-params',
        value: token.value
      }
    );
  }
);

var valueList = parser.constrainAcceptance(
  functionInput,
  function(fnInput) {
    return fnInput.value !== 'implicit-nil';
  }
);

var nonListValue = parser.constrainAcceptance(
  parser.any,
  function(token) {
    return token.label !== 'operator-token' && token.label !== 'function-input';
  }
);

module.exports = parser.name('functionCallParser', parser.mustConsumeAll(parser.many(
  parser.or(
    operator,
    parser.transform(
      parser.sequence(
        parser.or(
          valueList,
          nonListValue
        ),
        parser.many(callParamsOrSubscript)
      ),
      function(parsed) {
        var fn = parsed[0];
        var callLists = parsed[1];

        var res = fn;

        while (callLists.length > 0) {
          var callList = callLists.shift();

          if (callList.label === 'subscript') {
            res = {
              label: 'subscript',
              value: {
                array: res,
                subscript: callList.value
              }
            };
          } else {
            res = {
              label: 'function-call',
              value: {
                function: res,
                input: callList.value
              }
            };
          }
        }

        return res;
      }
    ),
    functionInput
  )
)));
