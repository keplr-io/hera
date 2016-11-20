export const addModel = (model) => ({
    type: 'add-model',
    model
});

export function modelsReducer(state = [], action) {
    switch (action.type) {
        case 'add-model':
            return [...state, action.model];
        default:
            return state;
    }
}

export default {
    models: modelsReducer
};
