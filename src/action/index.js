import config from '../config';

const { server } = config;

export const CHANGE_FILETREE = 'CHANGE_FILETREE';
export const SHOW_NOTIFICATION_WITH_TIMEOUT = 'SHOW_NOTIFICATION_WITH_TIMEOUT';
export const changeFileTree = fileTree => ({
    type: CHANGE_FILETREE,
    fileTree,
});

export const addFile = path => async (dispatch) => {
    const payload = {
        path,
    };
    const data = new FormData();
    data.append('json', JSON.stringify(payload));

    let response = await fetch(`${server}/file`, {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            path,
        }),
    });
    response = await response.json();
    if (response.success) {
        // update filetree again
        return dispatch(getFileTree());
    }
    // TODO handle error
        return dispatch(showNotificationWithTimeout('失败', 1000));
};
export const showNotificationWithTimeout = (notification, timeout) => ({
    type: SHOW_NOTIFICATION_WITH_TIMEOUT,
    notification,
    timeout,
});
export const getFileTree = () => async (dispatch) => {
    const path = `${server}/fileTree`;
    let response = await fetch(path);
    response = await response.json();
    return dispatch(changeFileTree(response.data));
};
