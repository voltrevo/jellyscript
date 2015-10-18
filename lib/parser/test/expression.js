'use strict';

var expression = require('../expression');
var generator = require('./generator.js');

generator('expression', expression, {
  valid: [
    ['0', { label: 'number', value: 0 }],
    ['"foo"', { label: 'string', value: 'foo' }],

    ['1 + 1', {
      label: 'binary-operation',
      value: {
        op: 'plus',
        args: [
          { label: 'number', value: 1 },
          { label: 'number', value: 1 }
        ]
      }
    }],

    ['x++', {
      label: 'unary-operation',
      value: {
        op: 'post-increment',
        arg: { label: 'identifier', value: 'x' }
      }
    }],

    // Yes this is valid as far as the parser is concerned. It would get rejected later.
    ['1++', {
      label: 'unary-operation',
      value: {
        op: 'post-increment',
        arg: { label: 'number', value: 1 }
      }
    }],

    ['x++ + 1', {
      label: 'binary-operation',
      value: {
        op: 'plus',
        args: [
          {
            label: 'unary-operation',
            value: {
              op: 'post-increment',
              arg: { label: 'identifier', value: 'x' }
            }
          },
          { label: 'number', value: 1 }
        ]
      }
    }],

    ['++x++', {
      label: 'unary-operation',
      value: {
        op: 'pre-increment',
        arg: {
          label: 'unary-operation',
          value: {
            op: 'post-increment',
            arg: { label: 'identifier', value: 'x' }
          }
        }
      }
    }],

    ['--3', {
      label: 'unary-operation',
      value: {
        op: 'pre-decrement',
        arg: { label: 'number', value: 3 }
      }
    }],

    // Right now this is expected to be equivalent to '-- -x', but I'm not sure whether that's a
    // good idea.
    ['---x', {
      label: 'unary-operation',
      value: {
        op: 'pre-decrement',
        arg: {
          label: 'unary-operation',
          value: {
            op: 'unary-minus',
            arg: { label: 'identifier', value: 'x' }
          }
        }
      }
    }],

    ['-3', { label: 'number', value: -3 }],

    ['---3', {
      label: 'unary-operation',
      value: {
        op: 'pre-decrement',
        arg: {
          label: 'number',
          value: -3
        }
      }
    }],

    ['-- -x', {
      label: 'unary-operation',
      value: {
        op: 'pre-decrement',
        arg: {
          label: 'unary-operation',
          value: {
            op: 'unary-minus',
            arg: { label: 'identifier', value: 'x' }
          }
        }
      }
    }],

    ['-a + b', {
      label: 'binary-operation',
      value: {
        op: 'plus',
        args: [
          {
            label: 'unary-operation',
            value: {
              op: 'unary-minus',
              arg: { label: 'identifier', value: 'a' }
            }
          },
          { label: 'identifier', value: 'b' }
        ]
      }
    }],

    ['- - - - -x', {
      label: 'unary-operation',
      value: {
        op: 'unary-minus',
        arg: {
          label: 'unary-operation',
          value: {
            op: 'unary-minus',
            arg: {
              label: 'unary-operation',
              value: {
                op: 'unary-minus',
                arg: {
                  label: 'unary-operation',
                  value: {
                    op: 'unary-minus',
                    arg: {
                      label: 'unary-operation',
                      value: {
                        op: 'unary-minus',
                        arg: { label: 'identifier', value: 'x' }
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
      label: 'unary-operation',
      value: {
        op: 'post-increment',
        arg: {
          label: 'unary-operation',
          value: {
            op: 'post-increment',
            arg: { label: 'identifier', value: 'x' }
          }
        }
      }
    }],

    ['-- --x', {
      label: 'unary-operation',
      value: {
        op: 'pre-decrement',
        arg: {
          label: 'unary-operation',
          value: {
            op: 'pre-decrement',
            arg: { label: 'identifier', value: 'x' }
          }
        }
      }
    }],

    ['a.b', {
      label: 'binary-operation',
      value: {
        op: 'dot',
        args: [
          { label: 'identifier', value: 'a' },
          { label: 'identifier', value: 'b' }
        ]
      }
    }],

    ['a.b++', {
      label: 'unary-operation',
      value: {
        op: 'post-increment',
        arg: {
          label: 'binary-operation',
          value: {
            op: 'dot',
            args: [
              { label: 'identifier', value: 'a' },
              { label: 'identifier', value: 'b' }
            ]
          }
        }
      }
    }],

    ['a = b', {
      label: 'binary-operation',
      value: {
        op: 'assign',
        args: [
          { label: 'identifier', value: 'a' },
          { label: 'identifier', value: 'b' }
        ]
      }
    }],

    ['a ~ b', {
      label: 'binary-operation',
      value: {
        op: 'mutate',
        args: [
          { label: 'identifier', value: 'a' },
          { label: 'identifier', value: 'b' }
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
  ],
  invalid: [
    /* [''],
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
    ['x[0][1, 2][3]'],
    ['a..b'] */
  ]
});
