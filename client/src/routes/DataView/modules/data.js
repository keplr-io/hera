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

export const updateDataAsync = (newData) => {
    return (dispatch) => dispatch({
        type: 'updateData',
        data: newData
    });
};

/**
 * Reducers
 */

const ActionHandlers = {
    updateData: (state, action) => getUpdatedDataState(
        state, action.data
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
            $set: newData
        }
    });
}
