'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.applyAmqpCtl = applyAmqpCtl;

var _amqplib = require('amqplib');

var _amqplib2 = _interopRequireDefault(_amqplib);

var _appEvents = require('./app-events');

var _appEvents2 = _interopRequireDefault(_appEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
function applyAmqpCtl(io, _ref) {
    var amqpUrl = _ref.amqpUrl,
        amqpQueue = _ref.amqpQueue;


    _amqplib2.default.connect(amqpUrl).then(function (conn) {
        return conn.createChannel();
    }).then(function (ch) {
        ch.assertQueue(amqpQueue, { durable: false });

        console.log(' [*] Waiting for messages in ' + amqpQueue);

        ch.consume(amqpQueue, function (msg) {
            try {
                var _JSON$parse = JSON.parse(msg.content.toString()),
                    event = _JSON$parse.event,
                    model = _JSON$parse.model,
                    data = _JSON$parse.data;

                if (_appEvents2.default[event]) {
                    io.sockets.emit(event, {
                        model: model,
                        data: data
                    });
                }
            } catch (e) {
                console.log('corrupt message', e);
            }
        }, { noAck: true });
    }).catch(console.warn);
}