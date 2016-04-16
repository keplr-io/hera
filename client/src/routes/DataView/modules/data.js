import Update from 'react-addons-update';

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

export default function dataReducer (state, action) {
    return ActionHandlers[action.type]
        ? ActionHandlers[action.type](state, action) : state;
}

/**
 * Utilities
*/

function getUpdatedDataState (state, newData) {
    return Update({
        data: {
            $merge: newData
        }
    });
}
