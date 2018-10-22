import {SAVE_TOKEN,CLEAR_TOKEN} from './../ActionType';

const initialState = '' || localStorage.getItem('token');

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case SAVE_TOKEN: {
            return payload;
        }
        case CLEAR_TOKEN:
            return '';
        default:
            return state;
    }
}
