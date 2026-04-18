const app = require('./app');
const http = require('http');
let server;
before(done => { server = app.listen(3001, done); });
after(done => { server.close(done); });
it('health check returns 200', done => {
  http.get('http://localhost:3001/health', res => {
    if (res.statusCode === 200) done();
    else done(new Error('Expected 200, got ' + res.statusCode));
  });
});