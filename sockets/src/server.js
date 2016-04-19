import http from 'http';
import socketIO from 'socket.io';

const server = http.createServer();
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('a client connected');

    socket.on('train-begin', (data) => {
        console.log('train-begin', data);
        socket.emit('new-data', data);
    });

    socket.on('batch-end', (data) => {
        console.log('yo')
        // console.log('batch-end', data);
        socket.emit('new-data', 'WHAT');
        socket.emit('new-data', data);
    });

    socket.on('epoch-end', (data) => {
        console.log('epoch-end', data);
        socket.emit('new-data', data);
    });

    socket.on('disconnect', () => {
        console.log('a client disconnected');
    });
});

server.listen(3000);
