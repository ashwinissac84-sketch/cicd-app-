const { test, before, after } = require('node:test');
const assert = require('node:assert');
const http = require('http');
const app = require('./app');

let server;

before(() => {
  return new Promise((resolve) => {
    server = app.listen(3001, resolve);
  });
});

after(() => {
  return new Promise((resolve) => {
    server.close(resolve);
  });
});

test('GET / returns 200', async () => {
  const statusCode = await new Promise((resolve, reject) => {
    http.get('http://localhost:3001/', (res) => {
      resolve(res.statusCode);
    }).on('error', reject);
  });
  assert.strictEqual(statusCode, 200);
});

test('GET /health returns healthy', async () => {
  const body = await new Promise((resolve, reject) => {
    http.get('http://localhost:3001/health', (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
  assert.strictEqual(body.status, 'healthy');
});