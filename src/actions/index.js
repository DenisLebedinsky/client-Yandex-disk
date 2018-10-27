import * as Types from './../ActionType';

// action creators

//------------  загрузка информации о диске и пользователе  ---------
export const fetch_info_disk_request = (token) => {
    return ({type: Types.FETCH_INFO_DISK_REQUEST, payload: token});
};

export const fetch_info_disk_succes = (info) => {
    return ({type: Types.FETCH_INFO_DISK_SUCCES, payload: info});
};

export const fetch_info_disk_failed = (e) => {
    return ({type: Types.FETCH_INFO_DISK_FAILED, message: e.message});
};

export const clear_info_disk = () => {
    return ({type: Types.CLEAR_INFO});
};

//-------------------------------------------------------------------

//------------ Загрузка файла и папок для отображения  --------------
export const fetch_Resources_request = (pathname) => {
    return ({type: Types.FETCH_RESOURCES_REQUEST, payload: pathname});
};

export const fetch_Resources_succes = (res) => {
    return ({type: Types.FETCH_RESOURCES_SUCCES, payload: res});
};

export const fetch_Resources_failed = (e) => {
    return ({type: Types.FETCH_RESOURCES_FAILED, message: e.message});
};

export const clear_Resources = () => {
    return ({type: Types.CLEAR_RESOURCES});
};
//-------------------------------------------------------------------

//------------  создание и удаление папки  --------------------------
export const create_folder_request = (pathname, currentPath) => {
    return ({type: Types.CREATE_FOLDER_REQUST, payload: {pathFolder: pathname, currentPath: currentPath}});
};

export const create_folder_succes = (pathname) => {
    return ({type: Types.CREATE_FOLDER_SUCCES, payload: pathname});
};

export const create_folder_failed = (e) => {
    return ({type: Types.CREATE_FOLDER_FAILED, message: e.message});
};

export const delete_folder_request = (pathname, currentPath) => {
    return ({type: Types.DEL_FOLDER_REQUST, payload: {pathFolder: pathname, currentPath: currentPath}});
};

export const delete_folder_succes = (pathname) => {
    return ({type: Types.DEL_FOLDER_SUCCES, payload: pathname});
};

export const delete_folder_failed = (e) => {
    return ({type: Types.DEL_FOLDER_FAILED, message: e.message});
};
//-------------------------------------------------------------------

//------------  Загрузка и скачивание файла -------------------------
export const upload_file_request = (pathname, file,size) => {
    return ({type: Types.UPLOAD_FILE_REQUST, payload: {pathname: pathname, file: file,size:size}});
};
export const upload_file_succes = () => {
    return ({type: Types.UPLOAD_FILE_SUCCES});
};
export const upload_file_failed = (e) => {
    return ({type: Types.UPLOAD_FILE_FAILED, message: e.message});
};


//-------------------------------------------------------------------

//------------  Сохранение / удаление токена авторизации ------------
export const save_token = (token) => {
    return ({type: Types.SAVE_TOKEN, payload: token});
};
export const clear_token = () => {
    return ({type: Types.CLEAR_TOKEN});
};
//-------------------------------------------------------------------

// -------------------- МОДАЛЬНОЕ ОКНО ------------------------------
export const open_modal = () => {
    return ({type: Types.OPEN_MODAL});
};
export const close_modal = () => {
    return ({type: Types.CLOSE_MODAL});
};
//___________________________________________________________________
