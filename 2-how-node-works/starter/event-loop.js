const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => {
  console.log('Time out 1 executed');
}, 0);

setImmediate(() => console.log('Immediate 1 finished!'));

fs.readFile('test-file.txt', () => {
  console.log('I/O finished');

  setTimeout(() => {
    console.log('Time out 2 executed');
  }, 0);

  setImmediate(() => console.log('Immediate 2 finished!'));

  setTimeout(() => {
    console.log('Time out 3 executed');
  }, 3000);

  process.nextTick(() => console.log('Process.nextTick'));

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log('Password encrypted', Date.now() - start);
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log('Password encrypted', Date.now() - start);
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log('Password encrypted', Date.now() - start);
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log('Password encrypted', Date.now() - start);
  });
});

console.log('Hello from the top level code');
