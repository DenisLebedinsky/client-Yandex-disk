import {FETCH_INFO_DISK_SUCCES} from './../ActionType'

export default (state = {}, {type, payload}) => {
    switch (type) {
        case FETCH_INFO_DISK_SUCCES:
            return payload.user;
        default:
            return state;
    }
}