import io from 'socket.io-client';
import updateData from '../modules/data';
import URLs from 'constants/urls';

export function connectToSocket() {
    let socket = io.connect(URLs.sockets);

    socket.on('new-data', function (data) {
        updateData(data || {});
    });

    return socket;
}
