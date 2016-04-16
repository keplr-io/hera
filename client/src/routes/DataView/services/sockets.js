import {io} from 'socket.io-client';
import updateData from '.data';
import URLs from 'constants.urls';

export function connectToSocket() {
    let socket = io(URLs.sockets);

    socket.on('data', function (data) {
        console.log(data);
        updateData(data);
    });

    return socket;
}
