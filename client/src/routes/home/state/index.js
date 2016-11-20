/**
 * Model
 */

export const addModel = model => ({
    type: 'add-model',
    model
});

export const startEpoch = (modelKey, epoch) => ({
    type: 'start-epoch',
    data: {
        modelKey,
        epoch
    }
});

export function modelsReducer(state = [], action) {
    switch (action.type) {
        case 'add-model':
            return [...state, action.model];
        case 'start-epoch':
            return state.map(
                model => (
                    model.key === action.data.modelKey ? Object.assign({}, model, {
                        epochs: [...(model.epochs || []), action.data.epoch]
                    }) : model
                )
            );

        default:
            return state;
    }
}

export default {
    models: modelsReducer
};
