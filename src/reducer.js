import { LOCATION_CHANGE } from 'react-router-redux';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { CHANGE_FILETREE, SHOW_NOTIFICATION_WITH_TIMEOUT, CHANGE_CURRENT_PATH } from './action';
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
        case CHANGE_CURRENT_PATH:
            return Object.assign({}, state, {
                currentPath: action.path,
            });
        case CHANGE_FILETREE:
            return Object.assign({}, state, {
                fileTree: action.fileTree,
            });
        case 'FILE_CONTENT_CHANGE':
            const newState = Object.assign({}, state);
            newState.content[action.path] = action.content;
            return newState;
        case SHOW_NOTIFICATION_WITH_TIMEOUT:
            return Object.assign({}, state, {
                notification: {
                    text: action.text,
                    timeout: action.timeout,
                },
            });
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
