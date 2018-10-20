import {SAVE_TOKEN} from './../ActionType';

const initialState = '';// || localStorage.getItem('token');

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case SAVE_TOKEN: {
            return payload;
        }
        default:
            return state;
    }
}
