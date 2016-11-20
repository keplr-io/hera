import io from 'socket.io-client';

export function connectToSocket(dispatch) {

    /**
     * Non-redux, mutable state, because need to update extremely quickly
     */

    window.metricData = {
        'mnist-mlp': []
    };

    const socket = io.connect('http://localhost:4000');

    socket.on('TRAIN_BEGIN', body => Object.assign(
        window.metricData, { [body.model]: [] }
    ));

    socket.on('BATCH_END', body => {
        window.metricData[body.model].push([
            body.data.batch,
            body.data.metricData.acc
        ]);

        window.metricGraphs[body.model].updateOptions({
            file: window.metricData[body.model]
        });

    });

    return socket;
}
