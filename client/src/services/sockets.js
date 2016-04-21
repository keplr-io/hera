import io from 'socket.io-client';
import {updateData} from 'routes/DataView/modules/data';
import URLs from 'constants/urls';

export function connectToSocket(store) {
    let socket = io.connect(URLs.sockets);

    socket.on('new-data', function (data) {
        store.dispatch(updateData({dataContent: data}));
    });

    return socket;
}
