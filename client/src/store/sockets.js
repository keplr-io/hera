import io from 'socket.io-client';
import { addModel } from 'routes/home/state';

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

            {
                [body.model]: body.data.trainConfig.metrics.reduce(
                    (metricDataMap, metricKey) => Object.assign(
                        metricDataMap,
                        { [metricKey]: [[0, 0]] }
                    ), {}
                )
            }
        );

        Object.assign(

            window.metricGraphs,

            {
                [body.model]: {}
            }

        );

        dispatch(addModel({
            key: body.model,
            data: body.data
        }));

    });

    socket.on('BATCH_END', body => {

        Object.keys(body.data.metricData).forEach(
            metricKey => updateLocalStateWithMetric(
                body.model,
                metricKey,
                body.data.batch,
                body.data.metricData[metricKey]
            )
        );

    });

    return socket;
}

function updateLocalStateWithMetric(modelKey, metricKey, batchIdx, metricVal) {
    window.metricData[modelKey][metricKey].push([
        batchIdx,
        metricVal
    ]);

    window.metricGraphs[modelKey][metricKey].updateOptions({
        file: window.metricData[modelKey][metricKey]
    });
}
