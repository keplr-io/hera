'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.applySocketIOControl = applySocketIOControl;

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _appEvents = require('./app-events');

var _appEvents2 = _interopRequireDefault(_appEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function applySocketIOControl(app, server) {
    var io = (0, _socket2.default)(server);
    io.on('connection', function (socket) {
        initDebugLogs(socket);
        return _appEvents2.default.map(function (evtKey) {
            return socket.on(evtKey, function (data) {
                return io.sockets.emit(evtKey, data);
            });
        });
    });
}

function initDebugLogs(socket) {
    console.info('a client connected');
    socket.on('disconnect', function () {
        return console.info('a client disconnected');
    });
}