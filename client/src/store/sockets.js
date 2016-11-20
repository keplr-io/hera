import io from 'socket.io-client';

export function connectToSocket(dispatch) {
    const socket = io.connect('http://localhost:4000');

    socket.on('TRAIN_BEGIN', data => console.log('train start', data));
    socket.on('BATCH_END', data => console.log('batch end', data));

    return socket;
}
