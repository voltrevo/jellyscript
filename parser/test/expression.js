'use strict';

var expression = require('../expression');
var generator = require('./generator.js');

generator('expression', expression, {
  valid: [
    ['0', { type: 'number', value: 0 }],
    ['"foo"', { type: 'string', value: 'foo' }],

    ['1 + 1', {
      type: 'binary-operation',
      value: {
        op: 'plus',
        args: [
          { type: 'number', value: 1 },
          { type: 'number', value: 1 }
        ]
      }
    }],

    ['x++', {
      type: 'unary-operation',
      value: {
        op: 'post-increment',
        arg: { type: 'identifier', value: 'x' }
      }
    }],

    // Yes this is valid as far as the parser is concerned. It would get rejected later.
    ['1++', {
      type: 'unary-operation',
      value: {
        op: 'post-increment',
        arg: { type: 'number', value: 1 }
      }
    }],

    ['x++ + 1', {
      type: 'binary-operation',
      value: {
        op: 'plus',
        args: [
          {
            type: 'unary-operation',
            value: {
              op: 'post-increment',
              arg: { type: 'identifier', value: 'x' }
            }
          },
          { type: 'number', value: 1 }
        ]
      }
    }],

    ['++x++', {
      type: 'unary-operation',
      value: {
        op: 'pre-increment',
        arg: {
          type: 'unary-operation',
          value: {
            op: 'post-increment',
            arg: { type: 'identifier', value: 'x' }
          }
        }
      }
    }],

    ['--3', {
      type: 'unary-operation',
      value: {
        op: 'pre-decrement',
        arg: { type: 'number', value: 3 }
      }
    }],

    // Right now this is expected to be equivalent to '-- -x', but I'm not sure whether that's a
    // good idea.
    ['---x', {
      type: 'unary-operation',
      value: {
        op: 'pre-decrement',
        arg: {
          type: 'unary-operation',
          value: {
            op: 'unary-minus',
            arg: { type: 'identifier', value: 'x' }
          }
        }
      }
    }],

    ['-3', { type: 'number', value: -3 }],

    ['---3', {
      type: 'unary-operation',
      value: {
        op: 'pre-decrement',
        arg: {
          type: 'number',
          value: -3
        }
      }
    }],

    ['-- -x', {
      type: 'unary-operation',
      value: {
        op: 'pre-decrement',
        arg: {
          type: 'unary-operation',
          value: {
            op: 'unary-minus',
            arg: { type: 'identifier', value: 'x' }
          }
        }
      }
    }],

    ['-a + b', {
      type: 'binary-operation',
      value: {
        op: 'plus',
        args: [
          {
            type: 'unary-operation',
            value: {
              op: 'unary-minus',
              arg: { type: 'identifier', value: 'a' }
            }
          },
          { type: 'identifier', value: 'b' }
        ]
      }
    }],

    ['- - - - -x', {
      type: 'unary-operation',
      value: {
        op: 'unary-minus',
        arg: {
          type: 'unary-operation',
          value: {
            op: 'unary-minus',
            arg: {
              type: 'unary-operation',
              value: {
                op: 'unary-minus',
                arg: {
                  type: 'unary-operation',
                  value: {
                    op: 'unary-minus',
                    arg: {
                      type: 'unary-operation',
                      value: {
                        op: 'unary-minus',
                        arg: { type: 'identifier', value: 'x' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }],

    ['x++ ++', {
      type: 'unary-operation',
      value: {
        op: 'post-increment',
        arg: {
          type: 'unary-operation',
          value: {
            op: 'post-increment',
            arg: { type: 'identifier', value: 'x' }
          }
        }
      }
    }],

    ['-- --x', {
      type: 'unary-operation',
      value: {
        op: 'pre-decrement',
        arg: {
          type: 'unary-operation',
          value: {
            op: 'pre-decrement',
            arg: { type: 'identifier', value: 'x' }
          }
        }
      }
    }],

    ['a.b', {
      type: 'binary-operation',
      value: {
        op: 'dot',
        args: [
          { type: 'identifier', value: 'a' },
          { type: 'identifier', value: 'b' }
        ]
      }
    }],

    ['a.b++', {
      type: 'unary-operation',
      value: {
        op: 'post-increment',
        arg: {
          type: 'binary-operation',
          value: {
            op: 'dot',
            args: [
              { type: 'identifier', value: 'a' },
              { type: 'identifier', value: 'b' }
            ]
          }
        }
      }
    }],

    ['a = b', {
      type: 'binary-operation',
      value: {
        op: 'assign',
        args: [
          { type: 'identifier', value: 'a' },
          { type: 'identifier', value: 'b' }
        ]
      }
    }],

    ['a ~ b', {
      type: 'binary-operation',
      value: {
        op: 'mutate',
        args: [
          { type: 'identifier', value: 'a' },
          { type: 'identifier', value: 'b' }
        ]
      }
    }],

    ['a.b = c'],
    ['foo ~ bar'],
    ['foo~bar'],
    ['foo~bar++'],
    ['foo~++bar++'],
    ['a = b = c = d'],
    ['a.b = b.c = c.d'],
    ['func => nil'],
    ['3 + func => nil'],
    ['func { return nil; } + 1'],
    ['(1)'],
    ['2 * (3 + 4)'],
    ['(x)++'],
    ['++(x)++'],
    ['(1 + 2) * (3 + 4)'],
    ['((1))'],
    ['(3 * (1 + 1)) * 17'],
    ['x()'],
    ['x(1, 2) + y(3, 4)'],
    ['x((1))'],
    ['(a)(b)'],
    ['foo(3, 4 + 5 * (6 + y) / j(34))'],

    ['x[0]'],
    ['x[0] + x[1] + x[2 + 3]'],
    ['x[y[z[t]]]'],
    ['x[0][1][2]'],
    ['(x[0])[0](5, 6, 7) + [1, 2, 3, 4] + [5, 6, 7][0]'],
    ['x[func => nil]']
  ].map(function(inputOutput) {
    return (inputOutput.length === 1 ?
      inputOutput :
      [
        inputOutput[0],
        {
          type: 'expression',
          value: inputOutput[1]
        }
      ]
    );
  }),
  invalid: [
    [''],
    [' =>'],
    ['=>'],
    ['=> '],
    ['==>'],
    [' true'],
    [' true '],
    ['false '],
    ['&'],
    ['1one'],
    [' foo'],
    ['7u'],
    [' 1'],
    ['1 '],
    ['3-'],
    ['1e1.1'],
    ['"'],
    ['"""'],
    ['(\')'],
    ['(1one)'],
    ['(1, 2)'],
    ['x(())'],
    ['(,)'],
    ['(foo,)'],
    ['(,foo)'],
    ['()'],
    [' ()'],
    ['() '],
    ['|'],
    ['**'],
    ['==='],
    ['!=='],
    ['x[0, 1]'],
    ['x[0][1, 2][3]']
  ]
});
