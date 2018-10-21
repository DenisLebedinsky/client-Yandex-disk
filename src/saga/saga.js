import {call, put, select, takeLatest, all} from 'redux-saga/effects'
import * as Api from './../api/api'
import {
    FETCH_INFO_DISK_REQUEST,
    FETCH_INFO_DISK_FAILED,
    FETCH_INFO_DISK_SUCCES,
    FETCH_RESOURCES_REQUEST,
    FETCH_RESOURCES_SUCCES,
    FETCH_RESOURCES_FAILED,
    SAVE_TOKEN
} from './../ActionType'
import {getToken} from "../selectors/selectors";

function* fetchDisk(action) {
    // сохраним токен и получим общую информацию о диске
    try {
        const token = action.payload;
        if (token !== '') {
            yield put({type: SAVE_TOKEN, payload: token});
            localStorage.setItem('token', token);
        }
        const info = yield call(Api.getDiskInfofoAPI, token);
        yield put({type: FETCH_INFO_DISK_SUCCES, payload: info});
    } catch (e) {
        yield put({type: FETCH_INFO_DISK_FAILED, message: e.message});
    }
}

function* fetchResources(action) {
    //получим данные по текушему каталогу
    //и его содержимое
    try {
        const token = yield select(getToken);
        const res = yield call(Api.getResourcesAPI, token, action.payload);
        yield put({type: FETCH_RESOURCES_SUCCES, payload: res});
    } catch (e) {
        yield put({type: FETCH_RESOURCES_FAILED, message: e.message});
    }
}

function* mySaga() {
    yield all([
        takeLatest(FETCH_INFO_DISK_REQUEST, fetchDisk),
        takeLatest(FETCH_RESOURCES_REQUEST, fetchResources),
    ]);
}

export default mySaga;
