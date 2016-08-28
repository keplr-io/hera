const defaultState = {};

/**
 *  Actions
 */

export function updateSelectedNode (data) {
    return {
        type: 'updateSelectedNode',
        data: data
    };
}

/**
 * Reducers
 */

const ActionHandlers = {
    updateSelectedNode: (state, action) => action.data
};

export default function reducer (state = defaultState, action) {
    return ActionHandlers[action.type]
         ? ActionHandlers[action.type](state, action) : state;
}
