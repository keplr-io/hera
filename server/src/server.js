import http from 'http';
import socketIO from 'socket.io';
import express from 'express';
import cors from 'cors';

import bodyParser from 'body-parser';
import appEvents from './app-events';

const appState = {
    shouldKillModel: {}
};

const app = express();
app.use(bodyParser.json());
app.use(cors());
const server = http.Server(app);
const io = socketIO(server);

app.get('/kill-list', (req, res) => {
    res.json(appState.shouldKillModel);
});

app.post('/schedule-kill', (req, res) => {
    Object.assign(
        appState.shouldKillModel,
        { [req.body.model]: true }
    );
    res.send(`killing ${req.body.model} on next epoch`);
});

app.post('/kill', (req, res) => {
    Object.assign(
        appState.shouldKillModel,
        { [req.body.model]: false }
    );
    res.send(`killed ${req.body.model}`);
});

io.on('connection', socket => {
    initDebugLogs(socket);

    return appEvents.map(
        evtKey => socket.on(
            evtKey, data => io.sockets.emit(evtKey, data)
        )
    );
});

server.listen(4000);

function initDebugLogs (socket) {
    console.info('a client connected');
    socket.on('disconnect',
        () => console.info('a client disconnected')
    );
}
