const vm = require('vm');
const fs = require('fs');
require('jsdom-global')();

const originalFoo = fs.readFileSync('./src/json2html.js', 'utf8');
const script = new vm.Script(originalFoo);
script.runInThisContext();

const complexTest = {
  'json': JSON.parse(fs.readFileSync('./tests/complex.json', 'utf8')),
  'html': fs.readFileSync('./tests/complex.html', 'utf8'),
};

QUnit.test('Test empty build', function( assert ) {
  assert.equal( JSON2HTML.build(), '');
});

QUnit.test('Test build with no tag name', function( assert ) {
  assert.equal( JSON2HTML.build({}), '');
});

QUnit.test('Test self closing tag', function( assert ) {
  assert.equal( JSON2HTML.build({tag: 'hr'}), '<hr/>');
});

QUnit.test('Test self closing tag with attribute', function( assert ) {
  // eslint-disable-next-line max-len
  assert.equal( JSON2HTML.build({tag: 'hr', attributes: {id: 'not-big-deal'}}), '<hr id="not-big-deal"/>');
});

QUnit.test('Test self closing tag with children', function( assert ) {
  assert.equal( JSON2HTML.build({tag: 'hr', children: [
    {tag: 'p'},
  ]}), '<hr/>');
});

QUnit.test('Test complex html', function( assert ) {
  const build = JSON2HTML.build(complexTest.json);
  assert.equal(build, complexTest.html);
});
