'use strict';

var makeBlock = require('../makeBlock.js');
var generator = require('./generator.js');

var braceBlock = makeBlock('{', '}');
var parenthesesBlock = makeBlock('(', ')');
var beginEndBlock = makeBlock('begin', 'end');

generator('braceBlock', braceBlock, {
  valid: [
    ['{}'],
    ['{foo}'],
    ['{anything can go here}'],
    ['{seriously, anything}'],
    ['{this parser gets layered, so usually the content goes into a separate parser}'],
    ['{hooray for modularity!}'],
    ['{{begin and end blocks {must} be {balanced}}}'],
    ['{a string shouldn\'t mess up the balance though, so this is allowed: "}"}'],
    ['{"strings can also escape quotes like this: \\" and block markers are still ignored: }"}']
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
