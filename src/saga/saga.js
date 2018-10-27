import {call, put, select, takeLatest, all} from 'redux-saga/effects'
import * as Api from './../api/api'
import * as Types from './../ActionType';
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
        const info = yield call(Api.getDiskInfofo_api, token);
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
        const res = yield call(Api.getResources_api, token, action.payload);
        yield put(actions.fetch_Resources_succes(res));
    } catch (e) {
        yield put(actions.fetch_Resources_failed(e));
    }
}

function* del_folder(action) {

    try {
        const token = yield select(getToken);
        const status = yield call(Api.delfolder_api, token, action.payload.pathFolder);
        if (status === 204) {
            yield put(actions.delete_folder_succes('Папка "' + action.payload.pathFolder.replace('/', '') + '" удалена'));
            const res = yield call(Api.getResources_api, token, action.payload.currentPath);
            yield put(actions.fetch_Resources_succes(res));
        }
    } catch (e) {
        yield put(actions.delete_folder_failed(e));
    }
}


function* create_folder(action) {
    //создадим папку
    try {
        const token = yield select(getToken);
        const status = yield call(Api.create_folder_api, token, action.payload.pathFolder);
        if (status === 201) {
            yield put(actions.create_folder_succes('Создана папка "' + action.payload.pathFolder.replace('/', '') + '"'));
            const res = yield call(Api.getResources_api, token, action.payload.currentPath);
            yield put(actions.fetch_Resources_succes(res));
        }
    } catch (e) {
        yield put(actions.create_folder_failed(e));
    }
}

function* upload_file(action) {
    try {
        const token = yield select(getToken);
        const result = yield call(Api.upload_file_get_url_api, token, action.payload.pathname);
        const status = yield call(Api.upload_file_api, result.data.href, action.payload.file, action.payload.size);
        console.log(status)
    } catch (e) {
        yield put(actions.upload_file_failed(e));
    }
}

function* mySaga() {
    yield all([
        takeLatest(Types.FETCH_INFO_DISK_REQUEST, fetchDisk),
        takeLatest(Types.FETCH_RESOURCES_REQUEST, fetchResources),
        takeLatest(Types.DEL_FOLDER_REQUST, del_folder),
        takeLatest(Types.CREATE_FOLDER_REQUST, create_folder),
        takeLatest(Types.UPLOAD_FILE_REQUST, upload_file),

    ]);
}

export default mySaga;
