import { LOCATION_CHANGE } from 'react-router-redux';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

// Initial routing state
const routeInitialState = fromJS({
    location: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
    switch (action.type) {
        /* istanbul ignore next */
        case LOCATION_CHANGE:
            return state.merge({
                location: action.payload,
            });
        default:
            return state;
    }
}

const initialState = {
        user: {
            name: 'tmp',
        },
        currentPath: '',
        fileTree: [],
        content: {},

};

function appReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
        case 'USER_FETCH_SUCCEEDED':
            return Object.assign({}, state, {
                user: action.user,
            });
        case 'USER_LOGOUT':
            return Object.assign({}, state, {
                user: {},
            });
        case 'CURRENT_PATH_CHANGE':
            return Object.assign({}, state, {
                currentPath: action.path,
            });
        case 'FILE_TREE_CHANGE':
            return Object.assign({}, state, {
                fileTree: action.fileTree,
            });
        case 'FILE_CONTENT_CHANGE':
            console.log('FILE_CONTENT_CHANGE');
            const newState = Object.assign({}, state);
            newState.content[action.path] = action.content;
            return newState;
        default:
            return state;
    }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
    return combineReducers({
        route: routeReducer,
        app: appReducer,
        ...injectedReducers,
    });
}
