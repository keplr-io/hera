import http from 'http';
import url from 'url';

import socketIO from 'socket.io';
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json({limit: '50mb'}));

const server = http.Server(app);
const io = socketIO(server);

io.on('connection', (socket) => {

    console.log('A client connected');

    socket.on('TRAIN_BEGIN', (data) => {
        console.log('evt', 'TRAIN_BEGIN', data)
        io.sockets.emit('data-train-begin', data);
    });

    socket.on('EPOCH_BEGIN', (data) => {
        console.log('evt', 'train-begin', data)

        io.sockets.emit('data-epoch-begin', data);
    });

    socket.on('BATCH_END', (data) => {
        console.log('evt', 'batch-end', data)

        io.sockets.emit('data-batch-end', data);
    });

    socket.on('EPOCH_END', (data) => {
        console.log('evt', 'epoch-end', data)

        io.sockets.emit('data-epoch-end', data);
    });

    socket.on('TRAIN_END', (data) => {
        console.log('evt', 'train-end', data)

        io.sockets.emit('data-train-end', data);
    });

    socket.on('disconnect', () => {
        console.log(`A client disconnected`);
    });

});

server.listen(4000);
