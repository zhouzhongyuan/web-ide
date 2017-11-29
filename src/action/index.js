import config from '../config';

const { server } = config;

export const CHANGE_FILETREE = 'CHANGE_FILETREE';
export const SHOW_NOTIFICATION_WITH_TIMEOUT = 'SHOW_NOTIFICATION_WITH_TIMEOUT';
export const CHANGE_CURRENT_PATH = 'CHANGE_CURRENT_PATH';
export const changeCurrentPath = path => ({
    type: CHANGE_CURRENT_PATH,
    path,
});
export const changeFileTree = fileTree => ({
    type: CHANGE_FILETREE,
    fileTree,
});

export const showNotificationWithTimeout = (notification, timeout) => ({
    type: SHOW_NOTIFICATION_WITH_TIMEOUT,
    notification,
    timeout,
});
export const getFileTree = (currentPath) => async (dispatch) => {
    const path = `${server}/fileTree`;
    let response = await fetch(path);
    response = await response.json();
    dispatch(changeCurrentPath(currentPath));
    return dispatch(changeFileTree(response.data));
};

export const addFile = path => async (dispatch) => {
    let response = await fetch(`${server}/file`, {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            path,
            action: 'update',
        }),
    });
    response = await response.json();
    if (response.success) {
        // update filetree again
        return dispatch(getFileTree(path));
    }
    // TODO handle error
    return dispatch(showNotificationWithTimeout('失败', 1000));
};

export const renameFile = (path, newPath) => async (dispatch) => {
    let response = await fetch(`${server}/file`, {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            path,
            newPath,
            action: 'rename',
        }),
    });
    response = await response.json();
    if (response.success) {
        // update filetree again
        return dispatch(getFileTree(newPath));
    }
    // TODO handle error
    return dispatch(showNotificationWithTimeout('失败', 1000));
};


export const deleteFile = path => async (dispatch) => {

    const pathArr = path.split('#');

    const query = `path=${pathArr[0]}&childPath=${pathArr[1]}`;

    let response = await fetch(`${server}/file/?${query}`, {
        method: 'DELETE',
    });
    response = await response.json();
    if (response.success) {
        // update filetree again
        return dispatch(getFileTree(''));
    }
    // TODO handle error
    return dispatch(showNotificationWithTimeout('失败', 1000));
};

