import Update from 'react-addons-update';
import io from 'socket.io-client';
import {updateData} from 'routes/DataView/modules/data';
import URLs from 'constants/urls';

const defaultModelFieldsUpdater = {
    logs: {
        $set: []
    },
    metricTimeseries: {
        $set: {
            loss: [],
            acc: []
        }
    },
    outputs: {
        $set: []
    }
};

export function connectToSocket(store) {
    let socket = io.connect(URLs.sockets);

    socket.on('data-train-begin', function (data) {
        store.dispatch(
            updateData({
                [data.model.id]: {
                    $set: Update(
                        data,
                        defaultModelFieldsUpdater
                    )
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

    socket.on('data-batch-end', function (data) {
        store.dispatch(
            updateData({
                [data.model.id]: {
                    logs: {
                        $push: [data.logs]
                    },
                    metricTimeseries: {
                        loss: {
                            $push: [
                                [data.logs.batch, data.logs.loss]
                            ]
                        },
                        acc: {
                            $push: [
                                [data.logs.batch, data.logs.acc]
                            ]
                        }
                    }
                }
            }
        ));
    });

    // socket.on('data-epoch-end', function (data) {
    //     store.dispatch(
    //         updateData({
    //             [data.model.id]: {
    //                 outputs: {
    //                     $push: [data.outputs]
    //                 }
    //             }
    //         }
    //     ));
    // });

    return socket;
}
