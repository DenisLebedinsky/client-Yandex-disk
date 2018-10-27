import axios from 'axios'

export const getDiskInfofo_api = (token) => {
    const Url = 'https://cloud-api.yandex.net/v1/disk?fields=%2F';

    return axios.get(Url, {
        headers: {
            'Accept': 'application/json',
            'Authorization': token
        }
    }).then(res => res.data)
        .catch(error => {
            throw error
        });
};

export const getResources_api = (token, path) => {
    const Url = 'https://cloud-api.yandex.net:443/v1/disk/resources?';
    let pathfull = 'path=%2F';
    if (path !== '') {
        pathfull = 'path=' + encodeURIComponent(path);
    }
    return axios.get(Url + pathfull, {
        headers: {
            'Accept': 'application/json',
            'Authorization': token
        }
    }).then(res => res.data)
        .catch(error => {
            throw error
        });
};

export const delfolder_api = (token, path) => {
    const Url = 'https://cloud-api.yandex.net:443/v1/disk/resources?';
    let pathfull = 'path=%2F';
    if (path !== '') {
        pathfull = 'path=' + encodeURIComponent(path);
    }
    return axios.delete(Url + pathfull, {
        headers: {
            'Accept': 'application/json',
            'Authorization': token
        }
    }).then(res => res.status)
        .catch(error => {
            throw error
        });
};


export const create_folder_api = (token, path) => {
    const Url = 'https://cloud-api.yandex.net/v1/disk/resources?';
    let pathfull = 'path=%2F';
    if (path) {
        pathfull = 'path=' + encodeURIComponent(path);
    }
    const instance = axios.create({
        'Accept': 'application/json'
    });
    instance.defaults.headers.common['Authorization'] = token;

    return instance.put(Url + pathfull)
        .then(res => res.status)
        .catch(error => {
            throw error
        });
};


export const upload_file_get_url_api = (token, path) => {
    const Url = 'https://cloud-api.yandex.net:443/v1/disk/resources/upload?';
    let pathfull = 'path=' + encodeURIComponent(path);
    const instance = axios.create({
        'Accept': 'application/json',
        'Authorization': token

    });
    instance.defaults.headers.common['Authorization'] = token;

    return instance.get(Url + pathfull)
        .then(res => res)
        .catch(error => {
            throw error
        });

};


export const upload_file_api = ( url, file,size) => {
    return axios.put(url, {
           headers: {
            'Accept': '*/*',
           'Content-Type': 'application/x-www-form-urlencoded',
            'Expect': '100-continue',
            'Content-Length': size,
               'origin':'http://localhost:3000/'
        },
        data: file
    })
        .then(res => res.status)
        .catch(error => {
            throw error
        });
};


