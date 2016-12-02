'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getServer = getServer;

var _app = require('./app');

var _killCtl = require('./kill-ctl');

var _socketioCtl = require('./socketio-ctl');

var _amqpCtl = require('./amqp-ctl');

function getServer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$dispatcher = _ref.dispatcher,
        dispatcher = _ref$dispatcher === undefined ? 'socketIO' : _ref$dispatcher,
        _ref$dispatcherConfig = _ref.dispatcherConfig,
        dispatcherConfig = _ref$dispatcherConfig === undefined ? null : _ref$dispatcherConfig;

    var _getApp = (0, _app.getApp)(),
        app = _getApp.app,
        server = _getApp.server,
        io = _getApp.io;

    (0, _killCtl.applyKillControl)(app);

    if (dispatcher === 'socketIO') {
        (0, _socketioCtl.applySocketIOControl)(server, io);
    }

    if (dispatcher === 'rabbitmq') {
        (0, _amqpCtl.applyAmqpCtl)(io, dispatcherConfig);
    }

    return {
        components: {
            app: app,
            server: server,
            io: io
        },
        start: function start() {
            var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4000;
            return server.listen(port);
        }
    };
}