import {delay} from 'redux-saga';

import {call, put, takeEvery} from 'redux-saga/effects';
import config from './config';

const { server } = config;
function getContent(path,pathContent) {
    return new Promise(async (resolve, reject) => {
        // 如果store中已经有了content，不向后台请求。
        if (pathContent) {
            return;
        }

        const remotePath = `${server}/file?path=${path}`;
        const response = await fetch(remotePath);
        const code = await response.json();
        if (code.success) {
            resolve(code.content);
        } else {
            reject();
        }
    });
}

function* getContentSaga(action) {
    try {
        const data = yield call(getContent, action.path, action.pathContent);
        yield put({
            type: 'FILE_CONTENT_CHANGE',
            path: action.path,
            content: data,
        });
    } catch (err) {
        console.log(err);
    }
}

function* mySaga() {
    yield takeEvery('CURRENT_PATH_CHANGE', getContentSaga);
}

export default mySaga;
