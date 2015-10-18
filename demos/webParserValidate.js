'use strict';

/* eslint-disable no-console */

var ace = require('brace');
require('brace/theme/cobalt');
require('brace/theme/solarized_dark');

var parser = require('voltrevo-parser');
var Stream = parser.flat.Stream;

window.parser = parser;

var programParser = require('../lib/parser/functionBlock.js');

window.addEventListener('load', function() {
  document.body.style.margin = '0';

  var div = document.createElement('div');
  div.style.width = '100vw';
  div.style.height = '100vh';
  div.setAttribute('id', 'editor');
  div.style.transition = 'background-color 250ms';
  document.body.appendChild(div);

  window.div = div;

  var editor = ace.edit('editor');
  editor.setTheme('ace/theme/solarized_dark');

  editor.setOptions({
    tabSize: 2,
    softTab: true,
    printMargin: false,
    displayIndentGuides: true
  });

  editor.setValue([
    'console = import("console");',
    '',
    'console.log("Hello world!");',
    '',
    'return nil;'
  ].join('\n'));

  var check = function() {
    var start = Date.now();
    var stream = Stream('{' + editor.getValue() + '}');
    var parseResult = programParser.consume(stream);
    var end = Date.now();

    console.log('Parse finished in ' + (end - start) + ' ms');
    window.ast = parseResult.value;
    window.res = parseResult;
    window.stream = stream;

    var cssElement = document.querySelector('#ace-solarized-dark');
    var content = document.querySelector('.ace_content');
    var gutter = document.querySelector('.ace_gutter');

    if (!cssElement) {
      return;
    }

    content.style.backgroundColor = (parseResult.success ? '#002B36' : '#2B0036');
    gutter.style.backgroundColor = '#000000';
  };

  editor.on('change', check);
  window.editor = editor;
  check();
  console.log('Inspect window.ast to look at the parser output');
});
