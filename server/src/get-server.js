import { getApp } from './app';
import { applyKillControl } from './kill-ctl';
import { applySocketIOControl } from './socketio-ctl';
import { applyAmqpCtl } from './amqp-ctl';

export function getServer(
    {
        dispatcher = 'socketIO',
        dispatcherConfig = null
    } = {}
) {

    const { app, server, io } = getApp();
    applyKillControl(app);

    if (dispatcher === 'socketIO') {
        applySocketIOControl(server, io);
    }

    if (dispatcher === 'rabbitmq') {
        applyAmqpCtl(io, dispatcherConfig);
    }

    return {
        components: {
            app,
            server,
            io
        },
        start: (port = 4000) => server.listen(port)
    };
}

