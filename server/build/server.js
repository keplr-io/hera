'use strict';

var _app = require('./app');

var _killCtl = require('./kill-ctl');

var _socketioCtl = require('./socketio-ctl');

var _getApp = (0, _app.getApp)(),
    app = _getApp.app,
    server = _getApp.server;

(0, _killCtl.applyKillControl)(app);
(0, _socketioCtl.applySocketIOControl)(app, server);

server.listen(4000);