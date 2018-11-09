import axios from 'axios';

export const getDiskInfofoApi = token => {
  // что бы везде не писать const Url, нужно было создать AXIOS instance с baseUrl
  // или объявить где-то один раз константу
  const Url = 'https://cloud-api.yandex.net/v1/disk?fields=%2F';

  return axios
    .get(Url, {
      headers: {
        Accept: 'application/json',
        Authorization: token,
      },
    })
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const getResourcesApi = (token, path) => {
  const Url = 'https://cloud-api.yandex.net:443/v1/disk/resources?';
  // не надо изобретать самому велосипед в AXIOS очень много инструментов из коробки идёт
  let pathfull = 'path=%2F';
  if (path !== '') {
    pathfull = 'path=' + encodeURIComponent(path);
  }
  return axios
    .get(Url, {
      headers: {
        Accept: 'application/json',
        Authorization: token,
      },
      params: {
        path: pathfull,
      },
    })
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
};

export const delFolderApi = (token, path) => {
  const Url = 'https://cloud-api.yandex.net:443/v1/disk/resources?';
  let pathfull = 'path=%2F';
  if (path !== '') {
    pathfull = 'path=' + encodeURIComponent(path);
  }
  return axios
    .delete(Url + pathfull, {
      headers: {
        Accept: 'application/json',
        Authorization: token,
      },
    })
    .then(res => res.status)
    .catch(error => {
      throw error;
    });
};

//запрос создаст папку по указанному пути
export const createFolderApi = (token, path) => {
  const Url = 'https://cloud-api.yandex.net/v1/disk/resources?';
  let pathfull = 'path=%2F';
  if (path) {
    pathfull = 'path=' + encodeURIComponent(path);
  }
  const instance = axios.create({
    Accept: 'application/json',
  });
  instance.defaults.headers.common['Authorization'] = token;

  return instance
    .put(Url + pathfull)
    .then(res => res.status)
    .catch(error => {
      throw error;
    });
};

//первый запрос для загрузки файла, вернет ссылку по которой нужно отправить файл
//ссылка действует 30мин.
export const uploadFileGetUrlApi = (token, path) => {
  const Url = 'https://cloud-api.yandex.net:443/v1/disk/resources/upload?';
  let pathfull = 'path=' + encodeURIComponent(path);
  const instance = axios.create({
    Accept: 'application/json',
    Authorization: token,
  });
  instance.defaults.headers.common['Authorization'] = token;

  return instance
    .get(Url + pathfull)
    .then(res => res)
    .catch(error => {
      throw error;
    });
};

//отправляем файл (blob) на полученную ссылку
export const uploadFileApi = (url, file) => {
  const parts = file.split(',');
  const typep = parts[0];
  const base64Data = parts[1];
  const type = typep.split(';')[0].split(':')[1];
  const blobfile = b64toBlob(base64Data, type);

  delete axios.defaults.headers.common['Authorization'];
  axios.defaults.headers.common['Content-Type'] = 'application/octet-stream';
  return axios
    .put(url, blobfile)
    .then(res => res.status)
    .catch(error => {
      throw error;
    });
};

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  let byteCharacters = atob(b64Data);
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize);

    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    let byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}
