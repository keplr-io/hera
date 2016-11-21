import io from 'socket.io-client';
import { addModel, startEpoch, firstDataPoint } from 'routes/home/state';

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
                [body.model]: {
                    static: {},
                    active: {}
                }
            }
        );

        Object.assign(
            window.metricGraphs,
            {
                [body.model]: {
                    static: {},
                    active: {}
                }
            }
        );

        dispatch(addModel({
            key: body.model,
            data: body.data
        }));

    });

    socket.on('EPOCH_BEGIN', body => {
        const modelMetricData = window.metricData[body.model];
        const metrics = body.data.params.metrics;
        Object.assign(
            modelMetricData,
            {
                static: metrics.reduce(
                    (metricDataMap, metricKey) => Object.assign(
                        metricDataMap,
                        {
                            [metricKey]: [
                                ...(modelMetricData.static[metricKey] || []),
                                ...(modelMetricData.active[metricKey] || [])
                            ]
                        }
                    ), {}
                )
            }
        );

        Object.assign(
            modelMetricData,
            {
                active: metrics.reduce(
                    (metricDataMap, metricKey) => Object.assign(
                        metricDataMap,
                        { [metricKey]: [] }
                    ), {}
                )
            }
        );

        dispatch(
            startEpoch(body.model, body.data.epoch)
        );
    });

    socket.on('EPOCH_END', body => {
        const modelMetricData = window.metricData[body.model];
        const metrics = body.data.params.metrics;

        metrics.forEach(metricKey =>
            window.requestAnimationFrame(() =>
                window.metricGraphs[body.model].static[metricKey].updateOptions({
                    file: modelMetricData.static[metricKey]
                })
            )
        );
    });

    socket.on('BATCH_END', body => {

        window.requestAnimationFrame(() =>

            Object.keys(body.data.metricData).forEach(
                metricKey => updateLocalStateWithMetric(
                    body.model,
                    metricKey,
                    body.data.idx,
                    body.data.metricData[metricKey]
                )
            )

        );

    });

    return socket;

    function updateLocalStateWithMetric(modelKey, metricKey, batchIdx, metricVal) {
        const metricData = window.metricData[modelKey].active[metricKey];

        metricData.push([
            batchIdx,
            metricVal
        ]);

        // if (metricData.length === 1) {
        //     dispatch(firstDataPoint(modelKey, metricKey));
        // }

        window.metricGraphs[modelKey].active[metricKey].updateOptions({
            file: metricData
        });
    }

}

