'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.applySocketIOControl = applySocketIOControl;

var _appEvents = require('./app-events');

var _appEvents2 = _interopRequireDefault(_appEvents);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function applySocketIOControl(server, io) {
    io.on('connection', function (socket) {
        initDebugLogs(socket);
        return Object.keys(_appEvents2.default).map(function (evtKey) {
            return socket.on(evtKey, function (data) {
                return io.sockets.emit(evtKey, data);
            });
        });
    });
}

function initDebugLogs(socket) {
    console.info(_chalk2.default.green('a client connected'));
    socket.on('disconnect', function () {
        return console.info(_chalk2.default.blue('a client disconnected'));
    });
}