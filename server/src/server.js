import socketIO from 'socket.io';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
const server = http.Server(app);
const io = socketIO(server);

app.post('/data', (req, res) => {
    res.send();
});

io.on('connection', (socket) => {
    console.log('a client connected');

    socket.on('train-begin', (data) => {
        io.sockets.emit('data-train-begin', data);
    });

    socket.on('epoch-begin', (data) => {
        io.sockets.emit('data-epoch-begin', data);
    });

    socket.on('batch-end', (data) => {
        io.sockets.emit('data-batch-end', data);
    });

    socket.on('epoch-end', (data) => {
        io.sockets.emit('data-epoch-end', data);
    });

    socket.on('train-end', (data) => {
        io.sockets.emit('data-train-end', data);
    });

    socket.on('disconnect', () => {
        console.log('a client disconnected');
    });
});

server.listen(4000);
