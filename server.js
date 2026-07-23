const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;
const rootDirectory = '.';

const server = http.createServer((req, res) => {
  const urlPath = path.join(rootDirectory, req.url);

  fs.stat(urlPath, (err, stats) => {
    if (!err && stats.isFile()) {
      fs.readFile(urlPath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Internal Server Error');
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          res.end(data);
        }
      });
    } else if (!err && stats.isDirectory()) {
      const indexPath = path.join(urlPath, 'index.html');
      fs.readFile(indexPath, (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Not Found');
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          res.end(data);
        }
      });
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found');
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`서버가 http://${hostname}:${port}/ 에서 실행 중입니다.`);
});