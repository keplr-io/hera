export const toggleGraph = graphKey => ({
    type: 'toggle-graph',
    graphKey
});

export function collapsedMapReducer(state = {}, action) {
    switch (action.type) {
        case 'toggle-graph':
            return Object.assign({},
                state,
                {
                    [action.graphKey]: !state[action.graphKey]
                }
            );

        default:
            return state;
    }
}

export default {
    collapsedMap: collapsedMapReducer
};
