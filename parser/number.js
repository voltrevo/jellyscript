'use strict';

var parser = require('parser');

var nonNegativeInteger = parser.transform(
  parser.oneOrMore(parser.digit),
  function(value) {
    var result = 0;

    value.forEach(function(digit) {
      result *= 10;
      result += digit;
    });

    return result;
  }
);

var integer = parser.transform(
  parser.labelledSequence(
    ['minusSign', parser.optional(
      parser.char('-')
    )],
    ['nonNegativeInteger', nonNegativeInteger]
  ),
  function(value) {
    if (value.minusSign.success) {
      return -value.nonNegativeInteger;
    }

    return value.nonNegativeInteger;
  }
);

module.exports = parser.transform(
  parser.constrain(
    parser.labelledSequence(
      [
        'minusSign',
        parser.optional(parser.char('-'))
      ],
      [
        'leadingDigits',
        parser.many(parser.digit)
      ],
      [
        'decimalPointAndDigits',
        parser.optional(
          parser.labelledSequence(
            ['decimalPoint', parser.char('.')],
            ['decimalDigits', parser.many(parser.digit)]
          )
        )
      ],
      [
        'exponent',
        parser.optional(
          parser.sequence(
            parser.char('e'),
            integer
          )
        )
      ]
    ),
    function(n) {
      return (
        n.leadingDigits.length > 0 || (
          n.decimalPointAndDigits.success &&
          n.decimalPointAndDigits.value.decimalDigits.length > 0
        )
      );
    }
  ),
  function(value) {
    var numStr = '';

    if (value.minusSign.success) {
      numStr += '-';
    }

    numStr += value.leadingDigits.join('');

    if (value.decimalPointAndDigits.success) {
      numStr += '.';
      numStr += value.decimalPointAndDigits.value.decimalDigits.join('');
    }

    if (value.exponent.success) {
      numStr += 'e';
      numStr += value.exponent.value[1];
    }

    return parseFloat(numStr);
  }
);
