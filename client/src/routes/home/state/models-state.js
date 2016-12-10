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

export const stopTraining = modelKey => ({
    type: 'stop-training',
    modelKey
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

const handlers = {
    'add-model': (state, action) => [...state, action.model],
    'start-epoch': (state, action) => {
        const {modelKey, epoch} = action.data;
        return updateSingleModelInState(state, modelKey, { epoch });
    },
    'update-kill-scheduled': (state, action) => {
        const {modelKey, killScheduled} = action.data;
        return updateSingleModelInState(state, modelKey, { killScheduled });
    },
    'stop-training': (state, action) => updateSingleModelInState(
        state, action.modelKey, { trainingStopped: true }
    )
};

export function modelsReducer(state = [], action) {
    return handlers[action.type] ? handlers[action.type](state, action) : state;
}

function updateSingleModelInState(state, modelKey, updates) {
    return state.map(
        model => model.key === modelKey
            ? Object.assign({}, model, updates) : model
    );
}

export default {
    models: modelsReducer
};
