'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _appEvents = require('./app-events');

var _appEvents2 = _interopRequireDefault(_appEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json({ limit: '50mb' }));

var server = _http2.default.Server(app);
var io = (0, _socket2.default)(server);

io.on('connection', function (socket) {
    console.info('a client connected');
    socket.on('disconnect', function () {
        return console.info('a client disconnected');
    });

    return _appEvents2.default.map(function (evtKey) {
        return socket.on(evtKey, function (data) {
            return io.sockets.emit(evtKey, data);
        });
    });
});

server.listen(4000);