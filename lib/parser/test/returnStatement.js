'use strict';

var returnStatement = require('../returnStatement');
var generator = require('./generator.js');

generator('returnStatement', returnStatement, {
  valid: [
    ['return 0;'],
    ['return \'foo\';'],
    ['return 1 + 1;'],
    ['return x++;'],

    // Yes this is valid as far as the parser is concerned. It would get rejected later.
    ['return 1++;'],

    ['return x++ + 1;'],
    ['return ++x++;'],
    ['return --3;'],

    // Right now this is expected to be equivalent to '-- -x', but I'm not sure whether that's a
    // good idea.
    ['return ---x;'],

    ['return ---3;'],
    ['return -- -x;'],
    ['return -a + b;'],
    ['return - - - - -x;'],
    ['return x++ ++;'],
    ['return -- --x;'],
    ['return a.b;'],
    ['return a.b++;'],
    ['return a = b;'],
    ['return a ~ b;'],
    ['return a.b = c;'],
    ['return foo ~ bar;'],
    ['return foo~bar;'],
    ['return foo~bar++;'],
    ['return foo~++bar++;'],
    ['return a = b = c = d;'],
    ['return a.b = b.c = c.d;'],
    ['return 1 ;'],
    ['return  true;'],
    ['return  true ;'],
    ['return  foo;'],
    ['return  1;'],
    ['return 1 ;'],
    ['return false ;'],
    ['return (1);']
  ],
  invalid: [
    [''],
    ['1'],
    ['1;'],
    ['return1;'],
    ['return ;'],
    ['return  =>;'],
    ['return =>;'],
    ['return => ;'],
    ['return ==>;'],
    ['return &;'],
    ['return 1one;'],
    ['return 7u;'],
    ['return 3-;'],
    ['return 1e1.1;'],
    ['return ";'],
    ['return """;'],
    ['return (\');'],
    ['return (1one);'],
    ['return (,);'],
    ['return (foo,);'],
    ['return (,foo);'],
    ['return  ();'],
    ['return () ;'],
    ['return |;'],
    ['return **;'],
    ['return ===;'],
    ['return !==;'],
    [' return 1;'],
    ['return 1; '],
    ['return 1'],
    ['return 1 1;']
  ]
});
