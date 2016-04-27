import http from 'http';
import socketIO from 'socket.io';

const server = http.createServer();
const io = socketIO(server);

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
