require('babel-register');
require('@babel/polyfill/noConflict');

const server = require('../../src/server').default;

const port = 4000;

module.exports = async () => {
  global.httpServer = await server.start({ port });
};
