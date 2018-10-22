import {FETCH_RESOURCES_SUCCES,CLEAR_DATA} from '../ActionType'

export default (state = {}, {type, payload}) => {
    switch (type) {
        case FETCH_RESOURCES_SUCCES:
            return payload._embedded;
        case CLEAR_DATA:
            return {};
        default:
            return state;
    }
}
