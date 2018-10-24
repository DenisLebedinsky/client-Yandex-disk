import * as Types from './../ActionType';

// action creators

//------------  загрузка информации о диске и пользователе  ---------
export const fetch_info_disk_request = (token) => {
    return ({type: Types.FETCH_INFO_DISK_REQUEST, payload: token});
};

export const fetch_info_disk_succes = (info) => {
    return ({type: Types.FETCH_INFO_DISK_SUCCES, payload: info});
};

export const  fetch_info_disk_failed = (e) => {
    return ({type: Types.FETCH_INFO_DISK_FAILED, message: e.message});
};

export const  clear_info_disk = () => {
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
    return ({type: Types.FETCH_RESOURCES_FAILED,message: e.message});
};

export const clear_Resources = () => {
    return ({type: Types.CLEAR_RESOURCES});
};
//-------------------------------------------------------------------

//------------  создание и удаление папки  --------------------------
export const create_folder_request = (pathname) => {
    return ({type: Types.CREATE_FOLDER_REQUST, payload: pathname});
};


export const delete_folder = (pathname) => {
    return ({type: Types.DEL_FOLDER_REQUST, payload: pathname});
};
//-------------------------------------------------------------------

//------------  Загрузка и скачивание файла -------------------------
export const upload_file = (pathname) => {
    return ({type: Types.UPLOAD_FILE_REQUST, payload: pathname});
};

export const download_file = (pathname) => {
    return ({type: Types.DOWNLOAD_FILE_REQUST, payload: pathname});
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


