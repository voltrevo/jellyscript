'use strict';

var parser = require('voltrevo-parser').flat;

var typeConstraint = function(type) {
  return function(token) {
    return 'type' in token && token.type === type;
  };
};

var operator = parser.if(
  typeConstraint('operator-token')
);

var expressionList = parser.if(
  typeConstraint('expression-list')
);

var singleElementArray = parser.if(
  function(token) {
    var isArray = ('type' in token && token.type === 'array');
    return isArray && token.value.length === 1;
  }
);

var callParamsOrSubscript = parser.transform(
  parser.or(
    expressionList,
    singleElementArray
  ),
  function(token) {
    return (
      'type' in token && token.type === 'array' ? {
        type: 'subscript',
        value: token.value[0]
      } : {
        type: 'call-params',
        value: token.value
      }
    );
  }
);

var valueList = parser.transform(
  parser.constrainAcceptance(
    expressionList,
    function(token) {
      return token.value.length === 1;
    }
  ),
  function(token) {
    return token.value[0];
  }
);

var nonListValue = parser.constrainAcceptance(
  parser.any,
  function(token) {
    return token.type !== 'operator-token' && token.type !== 'expression-list';
  }
);

module.exports = parser.mustConsumeAll(parser.many(
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

          if (callList.type === 'subscript') {
            res = {
              type: 'subscript',
              value: {
                array: res,
                subscript: callList.value
              }
            };
          } else {
            res = {
              type: 'function-call',
              value: {
                function: res,
                args: callList.value
              }
            };
          }
        }

        return res;
      }
    ),
    valueList
  )
));
