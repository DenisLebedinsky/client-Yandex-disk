import {OPEN_MODAL,CLOSE_MODAL} from './../ActionType'

export default (state = {isOpen:false}, {type}) => {
    switch (type) {
        case OPEN_MODAL:
            return {...state, isOpen:true};
        case CLOSE_MODAL:
            return {...state, isOpen:false};
        default:
            return state;
    }
}
