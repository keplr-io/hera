/**
 * Model
 */

import {scheduleKillReq} from '../resource';

export const scheduleKill = modelKey =>
    dispatch => scheduleKillReq(modelKey);

export const addModel = model => ({
    type: 'add-model',
    model
});

export const startEpoch = (modelKey, epoch, metrics) => ({
    type: 'start-epoch',
    data: {
        modelKey,
        epoch,
        metrics
    }
});

export const firstDataPoint = (modelKey, epochIdx, metricKey) => ({
    type: 'first-data-point',
    data: {
        modelKey,
        epochIdx,
        metricKey
    }
});

export function modelsReducer(state = [], action) {

    switch (action.type) {
        case 'add-model':
            return [...state, action.model];

        case 'start-epoch':
            const {modelKey, epoch} = action.data;
            /**
             * TODO: implement
             */
            return state.map(
                model => model.key === modelKey
                    ? Object.assign({}, model, {epoch})
                    : model
            );

        case 'first-data-point':
            /**
             * TODO: implement
             */

            return state;

        default:
            return state;
    }
}

export default {
    models: modelsReducer
};
