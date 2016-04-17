import io from 'socket.io-client';
import updateData from '../modules/data';
import URLs from 'constants/urls';

export function connectToSocket() {
    let socket = io(URLs.sockets);

    socket.on('data', function (data) {
        updateData(data || {});
    });

    return socket;
}
