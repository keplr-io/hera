'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _appEvents = require('./app-events');

var _appEvents2 = _interopRequireDefault(_appEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var appState = {
    shouldKillModel: {}
};

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)());
var server = _http2.default.Server(app);
var io = (0, _socket2.default)(server);

app.get('/kill-list', function (req, res) {
    res.json(appState.shouldKillModel);
});

app.post('/schedule-kill', function (req, res) {
    Object.assign(appState.shouldKillModel, _defineProperty({}, req.body.model, true));
    res.send('killing ' + req.body.model + ' on next epoch');
});

app.post('/kill', function (req, res) {
    Object.assign(appState.shouldKillModel, _defineProperty({}, req.body.model, false));
    res.send('killed ' + req.body.model);
});

io.on('connection', function (socket) {
    initDebugLogs(socket);

    return _appEvents2.default.map(function (evtKey) {
        return socket.on(evtKey, function (data) {
            return io.sockets.emit(evtKey, data);
        });
    });
});

server.listen(4000);

function initDebugLogs(socket) {
    console.info('a client connected');
    socket.on('disconnect', function () {
        return console.info('a client disconnected');
    });
}