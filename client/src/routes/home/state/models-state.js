/**
 * Model
 */

import {scheduleKillReq} from '../resource';

export const scheduleKill = modelKey =>
    dispatch => scheduleKillReq(modelKey).then(
        dispatch(killScheduled(modelKey))
    );

export const killScheduled = modelKey => ({
    type: 'update-kill-scheduled',
    data: {
        modelKey,
        killScheduled: true
    }
});

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

    const handlers = {
        'add-model': (state, action) => [...state, action.model],
        'start-epoch': (state, action) => {
            const {modelKey, epoch} = action.data;
            return state.map(
                model => model.key === modelKey
                    ? Object.assign({}, model, {epoch})
                    : model
            );
        },
        'update-kill-scheduled': (state, action) => {
            const {modelKey, killScheduled} = action.data;

            return state.map(
                model => model.key === modelKey
                    ? Object.assign({}, model, {
                        killScheduled
                    })
                    : model
            );
        }
    };

    return handlers[action.type] ? handlers[action.type](state, action) : state;
}

export default {
    models: modelsReducer
};
