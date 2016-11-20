import http from 'http';
import socketIO from 'socket.io';
import express from 'express';
import bodyParser from 'body-parser';
import appEvents from './app-events';

const app = express();
app.use(bodyParser.json({limit: '50mb'}));

const server = http.Server(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.info('a client connected');
    socket.on('disconnect', () => console.info('a client disconnected'));

    return appEvents.map(
        evtKey => socket.on(
            evtKey, data => io.sockets.emit(evtKey, data)
        )
    );
});

server.listen(4000);
