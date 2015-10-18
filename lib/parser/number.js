'use strict';

var parser = require('voltrevo-parser').flat;

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
      parser.single('-')
    )],
    ['nonNegativeInteger', nonNegativeInteger]
  ),
  function(value) {
    if (value.minusSign.set) {
      return -value.nonNegativeInteger;
    }

    return value.nonNegativeInteger;
  }
);

module.exports = parser.name('number', parser.transform(
  parser.constrainAcceptance(
    parser.labelledSequence(
      [
        'minusSign',
        parser.optional(parser.single('-'))
      ],
      [
        'leadingDigits',
        parser.many(parser.digit)
      ],
      [
        'decimalPointAndDigits',
        parser.optional(
          parser.labelledSequence(
            ['decimalPoint', parser.single('.')],
            ['decimalDigits', parser.many(parser.digit)]
          )
        )
      ],
      [
        'exponent',
        parser.optional(
          parser.sequence(
            parser.single('e'),
            integer
          )
        )
      ]
    ),
    function(n) {
      return (
        n.leadingDigits.length > 0 || (
          n.decimalPointAndDigits.set &&
          n.decimalPointAndDigits.value.decimalDigits.length > 0
        )
      );
    }
  ),
  function(value) {
    var numStr = '';

    if (value.minusSign.set) {
      numStr += '-';
    }

    numStr += value.leadingDigits.join('');

    if (value.decimalPointAndDigits.set) {
      numStr += '.';
      numStr += value.decimalPointAndDigits.value.decimalDigits.join('');
    }

    if (value.exponent.set) {
      numStr += 'e';
      numStr += value.exponent.value[1];
    }

    return Number(numStr);
  }
));
