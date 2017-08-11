const initialState = {
        user: {},
};

function webIDEApp(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }
    switch (action.type) {
        case 'USER_FETCH_SUCCEEDED':
            return Object.assign({}, state, {
                user: action.user ,
            });
            console.log(action);
            break;
        default:
            return state;
    }
}

export default webIDEApp;
