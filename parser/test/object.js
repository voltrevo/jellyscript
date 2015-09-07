'use strict';

var object = require('../object.js');
var generator = require('./generator.js');

generator('object', object, {
  valid: [
    ['{}'],
    ['{a: {b: {c: {d: {e: {}}}}}}'],
    ['{a: 1, b: 2}'],
    ['{a: 1, b: 2, c: 3}'],
    ['{a:1,b:2,c:3}'],
    ['{a : 1,b : 2,c : 3}'],
    ['{a: 1, b: "two", c: 3.0, d: ["four"]}'],
    ['{"a ": 1, " b": "two", " c ": 3.0, "d": ["four"]}']
  ],
  invalid: [
    [''],
    [' =>'],
    ['=> '],
    ['==>'],
    [' {}'],
    ['{} '],
    ['{,}'],
    ['{,,}'],
    ['{a: 1,}'],
    ['{,b: 1}'],
    ['{{}'],
    ['{}}']
  ]
});
