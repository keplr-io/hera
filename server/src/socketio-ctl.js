import appEvents from './app-events';

export function applySocketIOControl(server, io) {
    io.on('connection', socket => {
        initDebugLogs(socket);
        return Object.keys(appEvents).map(
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
