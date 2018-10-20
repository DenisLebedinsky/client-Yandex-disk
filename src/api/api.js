import axios from 'axios'

export const getDiskInfofoAPI = (token) => {
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

export const getResourcesAPI = (token, path) => {
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