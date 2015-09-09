'use strict';

var Stream = require('parser').stream;

var programParser = require('./program.js');

window.addEventListener('load', function() {
  document.body.style.margin = '0';

  var ta = document.createElement('textarea');
  ta.style.width = '100vw';
  ta.style.height = '100vh';
  ta.style.padding = '10px';
  ta.style.fontFamily = 'Courier New';
  ta.style.fontSize = '1em';
  ta.style.border = '0';
  ta.style.resize = 'none';
  ta.style.outline = 'none';
  ta.style.boxSizing = 'border-box';

  var button = document.createElement('button');
  var result = document.createElement('div');

  document.body.appendChild(ta);
  ta.focus()

  ta.value = [
    'console = import("console");',
    '',
    'console.log("Hello world!");',
    '',
    'return nil;'
  ].join('\n');

  var check = function() {
    var start = Date.now();
    var stream = new Stream('{' + ta.value + '}');
    var parseResult = programParser(stream);
    var end = Date.now();

    var color = (parseResult.success ? '#dfd' : '#fdd');
    document.body.style.backgroundColor = color;
    ta.style.backgroundColor = color;
    console.log('Parse finished in ' + (end - start) + ' ms');
  };
  
  ta.addEventListener('input', check);
  check();
});
