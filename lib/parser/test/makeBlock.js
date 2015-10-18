'use strict';

var parser = require('voltrevo-parser').flat;

var makeBlock = require('../makeBlock.js');
var generator = require('./generator.js');

var getString = function(consumer) {
  return parser.transform(
    consumer,
    function(stream) {
      var str = '';

      while (stream.hasNext()) {
        str += stream.next();
      }

      return str;
    }
  );
};

var braceBlock = getString(makeBlock('{', '}'));
var parenthesesBlock = getString(makeBlock('(', ')'));
var beginEndBlock = getString(makeBlock('begin', 'end'));

generator('braceBlock', braceBlock, {
  valid: [
    ['{}', ''],
    ['{foo}', 'foo'],
    ['{anything can go here}', 'anything can go here'],
    ['{seriously, anything}', 'seriously, anything'],
    [
      '{this parser gets layered, so usually the content goes into a ' +
      'separate parser}',

      'this parser gets layered, so usually the content goes into a separate ' +
      'parser'
    ],
    ['{hooray for modularity!}', 'hooray for modularity!'],
    [
      '{{begin and end blocks {must} be {balanced}}}',
      '{begin and end blocks {must} be {balanced}}'
    ],
    [
      '{a string shouldn\'t mess up the balance though, ' +
      'so this is allowed: "}"}',

      'a string shouldn\'t mess up the balance though, ' +
      'so this is allowed: "}"'
    ],
    [
      '{"strings can also escape quotes like this: \\" and block markers are ' +
      'still ignored: }"}',

      '"strings can also escape quotes like this: \\" and block markers are ' +
      'still ignored: }"'
    ]
  ],
  invalid: [
    [''],
    [' =>'],
    ['=> '],
    ['==>'],
    [' true'],
    [' true '],
    ['false '],
    ['&'],
    ['37'],
    ['1one'],
    [' foo'],
    ['()'],
    [' {}'],
    ['{} '],
    ['{{begin and end blocks {must be {balanced}}}'],
    ['{{}'],
    ['{}}'],
    ['{'],
    ['}']
  ]
});

generator('parenthesesBlock', parenthesesBlock, {
  valid: [
    ['()'],
    ['(foo)'],
    ['(anything can go here)'],
    ['(seriously, anything)'],
    ['(this parser gets layered, so usually the content goes into a separate parser)'],
    ['(hooray for modularity!)'],
    ['((begin and end blocks (must) be (balanced)))'],
    ['(a string shouldn\'t mess up the balance though, so this is allowed: ")")'],
    ['("strings can also escape quotes like this: \\" and block markers are still ignored: )")']
  ],
  invalid: [
    [''],
    [' =>'],
    ['=> '],
    ['==>'],
    [' true'],
    [' true '],
    ['false '],
    ['&'],
    ['37'],
    ['1one'],
    [' foo'],
    ['{}'],
    [' ()'],
    ['() '],
    ['((begin and end blocks (must be (balanced)))'],
    ['(()'],
    ['())'],
    ['('],
    [')']
  ]
});

generator('beginEndBlock', beginEndBlock, {
  valid: [
    ['begin end'],
    ['begin foo end'],
    ['begin anything can go here end'],
    ['begin seriously, anything end'],
    ['begin this parser gets layered, so usually the content goes into a separate parser end'],
    ['begin hooray for modularity! end'],
    ['begin beginbegin and end blocks begin must end be begin balanced end end end'],
    ['begin a string shouldn\'t mess up the balance though, so this is allowed: "end" end'],
    [
      'begin "strings can also escape quotes like this: \\" and block markers are still ignored: ' +
      'end" end'
    ]
  ],
  invalid: [
    [''],
    [' =>'],
    ['=> '],
    ['==>'],
    [' true'],
    [' true '],
    ['false '],
    ['&'],
    ['37'],
    ['1one'],
    [' foo'],
    ['{}'],
    [' begin end'],
    ['begin end '],
    ['begin begin begin and end blocks begin must be begin balanced end end end'],
    ['begin begin end'],
    ['begin end end'],
    ['begin'],
    ['end']
  ]
});
