'use strict';

var parser = require('voltrevo-parser').flat;

module.exports = parser.defer('function', function() {
  var argumentList = require('./argumentList.js');
  var arrow = require('./arrow.js');
  var expression = require('./expression');
  var funcKeyword = require('./funcKeyword.js');
  var functionBlock = require('./functionBlock.js');

  return parser.name(
    'function',
    parser.transform(
      parser.sequence(
        funcKeyword,
        parser.many(parser.whitespace),
        parser.optional(argumentList),
        parser.many(parser.whitespace),
        parser.or(
          parser.transform(
            parser.sequence(
              arrow,
              parser.many(parser.whitespace),
              expression
            ),
            function(res) {
              return [{
                label: 'returnStatement',
                value: res[2].value
              }];
            }
          ),
          functionBlock
        )
      ),
      function(res) {
        return {
          args: res[2].success ? res[2].value : [],
          body: res[4]
        };
      }
    )
  );
});
