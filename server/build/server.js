'use strict';

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json({ limit: '50mb' }));
var server = _http2.default.Server(app);
var io = (0, _socket2.default)(server);

app.post('/data', function (req, res) {
    res.send();
});

io.on('connection', function (socket) {
    console.log('a client connected');

    socket.on('train-begin', function (data) {
        io.sockets.emit('data-train-begin', data);
    });

    socket.on('epoch-begin', function (data) {
        io.sockets.emit('data-epoch-begin', data);
    });

    socket.on('batch-end', function (data) {
        io.sockets.emit('data-batch-end', data);
    });

    socket.on('epoch-end', function (data) {
        io.sockets.emit('data-epoch-end', data);
    });

    socket.on('train-end', function (data) {
        io.sockets.emit('data-train-end', data);
    });

    socket.on('disconnect', function () {
        console.log('a client disconnected');
    });
});

server.listen(4000);