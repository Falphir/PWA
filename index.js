const express = require('express');
const http = require('http');

const cors = require('cors');
const hostname = '127.0.0.1';
const port = 3000;

let router = require('./router');
let config = require('./config');

var mongoose = require('mongoose');

/* const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
}); */

var app = express();

app.use(cors());

app.use(router.initialize());

app.use(express.json())

mongoose.connect(config.db);

const server = http.Server(app);

server.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}/`);
});
