import Update from 'react-addons-update';

const defaultState = {
    data: {}
};

/**
 *  Actions
 */

export function updateData (newData) {
    return {
        type: 'updateData',
        data: newData
    };
}

/**
 * Reducers
 */

const ActionHandlers = {
    updateData: (state, action) => getUpdatedDataState(
        state, action.payload
    )
};

export default function dataReducer (state = defaultState, action) {
    return ActionHandlers[action.type]
        ? ActionHandlers[action.type](state, action) : state;
}

/**
 * Utilities
 */

function getUpdatedDataState (state, newData) {
    return Update(state, {
        data: {
            $merge: newData
        }
    });
}
