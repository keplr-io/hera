'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getApp = getApp;

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getApp() {
    var app = (0, _express2.default)();
    app.use(_bodyParser2.default.json());
    app.use((0, _cors2.default)());

    var server = _http2.default.Server(app);

    return { app: app, server: server };
}