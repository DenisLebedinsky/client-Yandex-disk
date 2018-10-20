import {FETCH_RESOURCES_SUCCES} from '../ActionType'

export default (state = {}, {type, payload}) => {
    switch (type) {
        case FETCH_RESOURCES_SUCCES:
            return payload._embedded;
        default:
            return state;
    }
}