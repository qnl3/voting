const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = (new JSDOM('<!DOCTYPE html><html><body></boxy></html>')).window;

global.document = dom.document;
global.window = dom.document.window
