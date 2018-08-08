const fs = require('fs');
const url = require('url');
const util = require('util');
const got = require('got');
const convert = require('html-to-json-data');
const { group, text } = require('html-to-json-data/definitions');
const { JSDOM } = require('jsdom');

async function stationNumberingSystemAsCSV() {
  const pageUrl = 'https://ja.m.wikipedia.org/wiki/%E9%A7%85%E3%83%8A%E3%83%B3%E3%83%90%E3%83%AA%E3%83%B3%E3%82%B0';
  const { body } = await got(pageUrl);
  const template = {
    // Wikipedia lazyly loads images https://blog.wikimedia.org/2016/09/19/mobile-web-improvements/
    // So I need to extract manually from the <noscript />
    // JsDOM won't help because of https://github.com/jsdom/jsdom/issues/1611
    linkText: text('a:nth-of-type(2)'),
    wholeText: text(':self'),
  };
  const validElement = ($) => [$(':self'), (node) => {
    $(node).find('.thumb').remove();
    return !node.hasClass('gallerybox');
  }];
  return convert(body, group('li', template).filterBy(validElement, (x) => x)).map((item) => {
    if (item.wholeText.includes('<img')) {
      const image = item.wholeText.substring(item.wholeText.indexOf('<img'), item.wholeText.indexOf('>') + 1);
      const dom = JSDOM.fragment(image);
      const src = dom.querySelector('img').getAttribute('src');
      const textAfterImage = item.wholeText.substring(item.wholeText.indexOf('>') + 1).trim();
      const text = textAfterImage.substring(0, textAfterImage.indexOf('(') === -1 ? textAfterImage.length : textAfterImage.indexOf('('));;
      return {
        image: url.resolve(pageUrl, src),
        text: text.trim(),
      };
    }
  }).filter(Boolean);
}

async function generate() {
  const data = await stationNumberingSystemAsCSV();
  return util.promisify(fs.writeFile)('./logos.json', JSON.stringify(data, null, '  '));
}

if (require.main === module) {
  generate();
}
