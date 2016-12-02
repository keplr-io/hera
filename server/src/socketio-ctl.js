import socketIO from 'socket.io';
import appEvents from './app-events';

export function applySocketIOControl(app, server) {
    const io = socketIO(server);
    io.on('connection', socket => {
        initDebugLogs(socket);
        return appEvents.map(
            evtKey => socket.on(
                evtKey,
                data => io.sockets.emit(evtKey, data)
            )
        );
    });
}

function initDebugLogs (socket) {
    console.info('a client connected');
    socket.on('disconnect',
        () => console.info('a client disconnected')
    );
}
