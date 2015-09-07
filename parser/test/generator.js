'use strict';

/* global describe it */

var assert = require('assert');
var expect = require('chai').expect;

var parser = require('parser');
var Stream = parser.stream;

module.exports = function(consumerName, consumerParam, opts) {
  var consumer = parser.mustConsumeAll(consumerParam);

  describe(consumerName, function() {
    if (opts.valid) {
      describe('succeeds for valid inputs', function() {
        opts.valid.map(function(inputOutput) {
          assert(Array.isArray(inputOutput));

          if (inputOutput[0] === '-- --x') {
            debugger;
          }

          return {
            input: inputOutput[0],
            expectedOutput: {
              exists: inputOutput.length >= 2,
              value: inputOutput[1]
            },
            actualOutput: consumer(new Stream(inputOutput[0]))
          };
        }).forEach(function(testCase) {
          it(JSON.stringify(testCase.input), function() {
            expect(testCase.actualOutput.success).to.equal(true);

            if (testCase.expectedOutput.exists) {
              expect(testCase.actualOutput.value).to.deep.equal(testCase.expectedOutput.value);
            }
          });
        });
      });
    }

    if (opts.invalid) {
      describe('fails for invalid inputs', function() {
        opts.invalid.map(function(inputOnly) {
          assert(Array.isArray(inputOnly));

          return {
            input: inputOnly[0],
            output: consumer(new Stream(inputOnly[0]))
          };
        }).forEach(function(testCase) {
          it(JSON.stringify(testCase.input), function() {
            expect(testCase.output.success).to.equal(false);
          });
        });
      });
    }
  });
};
