import jdom from 'jdom';

const doc = jdom.jdom('<!doctype html><html><body></boxy></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
    if(!(key in global)) {
        global[key] = window[key];
    }
});
