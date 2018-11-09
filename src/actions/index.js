import * as Types from './../ActionType';

/**
 * надо было разнести actions в разные файлы, отвечающие за разные сущности,
 * модальным actions здесь точно не место
 * файлы надо было назвать по названию редюсери или сущности с которой они работают
 */

// action creators

//------------  загрузка информации о диске и пользователе  ---------
// зачем бесполезный return
export const fetchInfoDiskRequest = token => ({
  type: Types.FETCH_INFO_DISK_REQUEST,
  payload: token,
});

export const fetchInfoDiskSucces = info => {
  return { type: Types.FETCH_INFO_DISK_SUCCES, payload: info };
};

export const fetchInfoDiskFailed = e => {
  return { type: Types.FETCH_INFO_DISK_FAILED, message: e.message };
};

export const clearInfoDisk = () => {
  return { type: Types.CLEAR_INFO };
};

//-------------------------------------------------------------------

//------------ Загрузка файла и папок для отображения  --------------
export const fetchResourcesRequest = pathname => {
  return { type: Types.FETCH_RESOURCES_REQUEST, payload: pathname };
};

export const fetchResourcesSucces = res => {
  return { type: Types.FETCH_RESOURCES_SUCCES, payload: res };
};

export const fetchResourcesFailed = e => {
  return { type: Types.FETCH_RESOURCES_FAILED, message: e.message };
};

export const clearResources = () => {
  return { type: Types.CLEAR_RESOURCES };
};
//-------------------------------------------------------------------

//------------  создание и удаление папки  --------------------------
export const createFolderRequest = (pathname, currentPath) => {
  return {
    type: Types.CREATE_FOLDER_REQUST,
    payload: { pathFolder: pathname, currentPath: currentPath },
  };
};

export const createFolderSucces = pathname => {
  return { type: Types.CREATE_FOLDER_SUCCES, payload: pathname };
};

export const createFolderFailed = e => {
  return { type: Types.CREATE_FOLDER_FAILED, message: e.message };
};

export const deleteFolderRequest = (pathname, currentPath) => {
  return {
    type: Types.DEL_FOLDER_REQUST,
    payload: { pathFolder: pathname, currentPath: currentPath },
  };
};

export const deleteFolderSucces = pathname => {
  return { type: Types.DEL_FOLDER_SUCCES, payload: pathname };
};

export const deleteFolderFailed = e => {
  return { type: Types.DEL_FOLDER_FAILED, message: e.message };
};
//-------------------------------------------------------------------

//------------  Загрузка и скачивание файла -------------------------
export const uploadFileRequest = (pathname, filename, file) => {
  return {
    type: Types.UPLOAD_FILE_REQUST,
    payload: { pathname: pathname, filename, file: file },
  };
};
export const uploadFileSucces = () => {
  return { type: Types.UPLOAD_FILE_SUCCES, payload: 'Загрузка началась' };
};
export const uploadFileFailed = e => {
  return { type: Types.UPLOAD_FILE_FAILED, message: e.message };
};

//-------------------------------------------------------------------

//------------  Сохранение / удаление токена авторизации ------------
export const saveToken = token => {
  return { type: Types.SAVE_TOKEN, payload: token };
};
export const clearToken = () => {
  return { type: Types.CLEAR_TOKEN };
};
//-------------------------------------------------------------------

// -------------------- МОДАЛЬНОЕ ОКНО ------------------------------
export const openModal = () => {
  return { type: Types.OPEN_MODAL };
};
export const closeModal = () => {
  return { type: Types.CLOSE_MODAL };
};
//___________________________________________________________________
