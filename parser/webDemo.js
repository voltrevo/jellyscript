'use strict';

var Stream = require('parser').stream;

var programParser = require('./program.js');

window.addEventListener('load', function() {
  var ta = document.createElement('textarea');
  var button = document.createElement('button');
  var result = document.createElement('div');

  ta.style.width = '100vw';
  ta.style.height = '80vh';
  ta.style.fontFamily = 'courier new';
  ta.style.fontSize = '18px';
  button.style.width = '100vw';

  document.body.appendChild(ta);
  document.body.appendChild(button);
  document.body.appendChild(result);

  ta.value = [
    'console = import("console");',
    '',
    'console.log("Hello world!");',
    '',
    'return nil;'
  ].join('\n');

  button.innerHTML = 'Check (cmd + enter)';

  var check = function() {
    var start = Date.now();
    var stream = new Stream('{' + ta.value + '}');
    var parseResult = programParser(stream);
    var end = Date.now();
    result.innerHTML = (parseResult.success ? 'valid!' : 'not valid!') + ' (' + (end - start) + 'ms)';
  };

  button.addEventListener('click', check);

  document.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 13 && evt.metaKey) {
      check();
    }
  });
});
