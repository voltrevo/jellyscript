'use strict';

var parser = require('parser');

var typeConstraint = function(type) {
  return function(token) {
    return 'type' in token && token.type === type;
  };
};

var operator = parser.constrain(
  parser.any,
  typeConstraint('operator-token')
);

var expressionList = parser.constrain(
  parser.any,
  typeConstraint('expression-list')
);

var callParamsList = parser.transform(
  expressionList,
  function(token) {
    return {
      type: 'call-params',
      value: token.value
    };
  }
);

var valueList = parser.transform(
  parser.constrain(
    expressionList,
    function(token) {
      return token.value.length === 1;
    }
  ),
  function(token) {
    return token.value[0];
  }
);

var nonListValue = parser.constrain(
  parser.any,
  function(token) {
    if (!('type' in token)) {
      return true;
    }

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
        parser.many(callParamsList)
      ),
      function(parsed) {
        var fn = parsed[0];
        var callLists = parsed[1];

        var res = fn;

        while (callLists.length > 0) {
          res = {
            type: 'function-call',
            value: {
              function: res,
              args: callLists.shift()
            }
          };
        }

        return res;
      }
    ),
    valueList
  )
));
