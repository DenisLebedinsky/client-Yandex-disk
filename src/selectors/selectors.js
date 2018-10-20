import {createSelector} from 'reselect'

const token = state => state.auth;
const data = state => state.data;
const info = state => state.info;
const path = state => state.data.path;

export const getPath = createSelector(
    path,
    path => {
        if (path) {
            const pth = path.split('/');
            if (pth[1] === '') {
                pth.pop();
            }
            return pth;
        }
        return [];
    }
);

export const getToken = createSelector(
    token,
    token => token
);

export const getData = createSelector(
    data,
    data => data
);

export const getinfo = createSelector(
    info,
    info => info
);

