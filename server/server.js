const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const path = require('path');
const express = require('express');
const fixtures = require('./fixtures');

server.use(middlewares);

server.use(jsonServer.rewriter({
  '/api/*': '/$1',
}));

server.use('/', express.static(path.join(__dirname, 'public')));

const router = jsonServer.router(fixtures());

server.use(router);

server.listen(3000, () => {
  console.log('\x1b[32m%s\x1b[0m', 'JSON Server is running');
});
