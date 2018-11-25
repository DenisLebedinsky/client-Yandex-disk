import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import * as Api from './../api/api';
import * as Types from '../actions/ActionType';
import * as actions from './../actions/action';
import { getToken } from '../selectors/selectors';

export function* fetchDisk(action) {
  // сохраним токен и получим общую информацию о диске
  try {
    const token = action.payload;
    if (token !== '') {
      yield put(actions.saveToken(token));
      localStorage.setItem('token', token);
    }
    const info = yield call(
      Api.getDiskInfofoApi,
      token,
    );
    yield put(actions.fetchInfoDiskSucces(info));
  } catch (e) {
    yield put(actions.fetchInfoDiskFailed(e));
  }
}

export function* fetchResources(action) {
  //получим данные по текушему каталогу
  //и его содержимое
  try {
    const token = yield select(getToken);
    const res = yield call(
      Api.getResourcesApi,
      token,
      action.payload,
    );
    yield put(actions.fetchResourcesSucces(res));
  } catch (e) {
    yield put(actions.fetchResourcesFailed(e));
  }
}

export function* delFolder(action) {

  try {
    const token = yield select(getToken);
    const status = yield call(
      Api.delFolderApi,
      token, action.payload.pathFolder,
    );
    // TODO: [🐱👀] Здесь и далее: нет обработки кодов ошибок.
    if (status === 204) {
      yield put(
        actions.deleteFolderSucces(
          'Папка "' + action.payload.pathFolder.replace('/', '') + '" удалена',
        ),
      );
      const res = yield call(
        Api.getResourcesApi,
        token,
        action.payload.currentPath,
      );
      yield put(actions.fetchResourcesSucces(res));
    }
  } catch (e) {
    yield put(actions.deleteFolderFailed(e));
  }
}

export function* createFolder(action) {
  //создадим папку
  try {
    const token = yield select(getToken);
    const status = yield call(
      Api.createFolderApi,
      token,
      action.payload.pathFolder,
    );
    if (status === 201) {
      yield put(actions.createFolderSucces(
        'Создана папка "' + action.payload.pathFolder.replace('/', '') + '"',
        ),
      );
      const res = yield call(
        Api.getResourcesApi,
        token,
        action.payload.currentPath,
      );
      yield put(actions.fetchResourcesSucces(res));
    }
  } catch (e) {
    yield put(actions.createFolderFailed(e));
  }
}

export function* uploadFile(action) {
  try {
    const path =
      action.payload.pathname === '/'
        ? action.payload.pathname + action.payload.filename
        : action.payload.pathname + '/' + action.payload.filename;
    const token = yield select(getToken);
    const result = yield call(
      Api.uploadFileGetUrlApi,
      token,
      path);
    const status = yield call(
      Api.uploadFileApi,
      result.data.href,
      action.payload.file,
    );
    if (status === 201) {
      yield put(actions.uploadFileSucces());
      const res = yield call(
        Api.getResourcesApi,
        token,
        action.payload.pathname,
      );
      yield put(actions.fetchResourcesSucces(res));
    }
  } catch (e) {
    yield put(actions.uploadFileFailed(e));
  }
}

function* mySaga() {
  yield all([
    takeLatest(Types.FETCH_INFO_DISK_REQUEST, fetchDisk),
    takeLatest(Types.FETCH_RESOURCES_REQUEST, fetchResources),
    takeLatest(Types.DEL_FOLDER_REQUST, delFolder),
    takeLatest(Types.CREATE_FOLDER_REQUST, createFolder),
    takeLatest(Types.UPLOAD_FILE_REQUST, uploadFile),

  ]);
}

export default mySaga;

