import io from 'socket.io-client';
import { addModel, startEpoch } from 'routes/home/state';

export function connectToSocket(dispatch) {

    /**
     * Non-redux, mutable state, because need to update extremely quickly
     */

    window.metricData = {};
    window.metricGraphs = {};

    const socket = io.connect('http://localhost:4000');

    socket.on('TRAIN_BEGIN', body => {

        Object.assign(
            window.metricData,
            { [body.model]: {} }
        );

        Object.assign(
            window.metricGraphs,
            { [body.model]: {} }
        );

        dispatch(addModel({
            key: body.model,
            epochs: [],
            data: body.data
        }));

    });

    socket.on('EPOCH_BEGIN', body => {
        Object.assign(
            window.metricData[body.model],
            {
                [body.data.epoch]: body.data.params.metrics.reduce(
                    (metricDataMap, metricKey) => Object.assign(
                        metricDataMap,
                        { [metricKey]: [[0, 0]] }
                    ), {}
                )
            }
        );

        Object.assign(
            window.metricGraphs[body.model],
            {
                [body.data.epoch]: {}
            }
        );

        dispatch(
            startEpoch(body.model, body.data.epoch)
        );
    });

    socket.on('BATCH_END', body => {

        Object.keys(body.data.metricData).forEach(
            metricKey => updateLocalStateWithMetric(
                body.model,
                body.data.epoch,
                metricKey,
                body.data.batch,
                body.data.metricData[metricKey]
            )
        );

    });

    return socket;
}

function updateLocalStateWithMetric(modelKey, epochIdx, metricKey, batchIdx, metricVal) {
    const metricData = window.metricData[modelKey][epochIdx][metricKey];
    metricData.push([
        batchIdx,
        metricVal
    ]);

    window.requestAnimationFrame(() =>
        window.metricGraphs[modelKey][epochIdx][metricKey].updateOptions({
            file: metricData
        })
    );
}
