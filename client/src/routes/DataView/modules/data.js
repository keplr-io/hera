import Update from 'react-addons-update';

const defaultState = {
};

/**
 *  Actions
 */

export function updateData (updateQuery) {
    return {
        type: 'updateData',
        updateQuery: updateQuery
    };
}

/**
 * Reducers
 */

const ActionHandlers = {
    updateData: (state, action) => Update(state, action.updateQuery)
};

export default function dataReducer (state = defaultState, action) {
    return ActionHandlers[action.type]
        ? ActionHandlers[action.type](state, action) : state;
}
