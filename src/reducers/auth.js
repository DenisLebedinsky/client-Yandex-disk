import {SAVE_TOKEN} from './../ActionType';

export default (state = '', {type, payload}) => {
    switch (type) {
        case SAVE_TOKEN: {
            return payload.token;
        }
        default:
            return state;
    }
}
