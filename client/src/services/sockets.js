import io from 'socket.io-client';
import {updateData} from 'routes/DataView/modules/data';
import URLs from 'constants/urls';

export function connectToSocket(store) {
    let socket = io.connect(URLs.sockets);

    socket.on('data-train-begin', function (data) {
        store.dispatch(
            updateData({
                [data.model.id]: {
                    $set: data
                }
            }
        ));
    });

    socket.on('data-train-end', function (data) {
        store.dispatch(
            updateData({
                [data.model.id]: {
                    $set: null
                }
            }
        ));
    });

    return socket;
}
