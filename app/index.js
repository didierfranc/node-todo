const { createServer } = require('http');
const { compileFile } = require('pug');
const { parse: parseURL } = require('url');
const { parse: parseQuery } = require('querystring');
const { fromBase64, toBase64, clear } = require('./helpers');
const { dispatch } = require('./store');

const render = compileFile('app/templates/template.pug');

const app = clear((req, res) => {
  const { pathname, query } = parseURL(req.url);
  const state = fromBase64(pathname.split('/')[1]);

  const actions = parseQuery(query);
  const newState = dispatch(state, actions);

  const html = render({ state: newState });

  if (pathname === '/' || query) {
    res.writeHead(307, { Location: toBase64(newState) });
  }

  res.end(html);
});

const server = createServer(app);
server.listen(3000);
