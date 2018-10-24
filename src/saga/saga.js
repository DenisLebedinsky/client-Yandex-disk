import {call, put, select, takeLatest, all} from 'redux-saga/effects'
import * as Api from './../api/api'
import {FETCH_INFO_DISK_REQUEST, FETCH_RESOURCES_REQUEST} from './../ActionType'
import * as actions from './../actions'
import {getToken} from '../selectors/selectors';

function* fetchDisk(action) {
    // сохраним токен и получим общую информацию о диске
    try {
        const token = action.payload;
        if (token !== '') {
            yield put(actions.save_token(token));
            localStorage.setItem('token', token);
        }
        const info = yield call(Api.getDiskInfofoAPI, token);
        yield put(actions.fetch_info_disk_succes(info));
    } catch (e) {
        yield put(actions.fetch_info_disk_failed(e));
    }
}

function* fetchResources(action) {
    //получим данные по текушему каталогу
    //и его содержимое
    try {
        const token = yield select(getToken);
        const res = yield call(Api.getResourcesAPI, token, action.payload);
        yield put(actions.fetch_Resources_succes(res));
    } catch (e) {
        yield put(actions.fetch_Resources_failed(e));
    }
}



function* mySaga() {
    yield all([
        takeLatest(FETCH_INFO_DISK_REQUEST, fetchDisk),
        takeLatest(FETCH_RESOURCES_REQUEST, fetchResources),
    ]);
}

export default mySaga;
