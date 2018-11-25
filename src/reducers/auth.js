import {SAVE_TOKEN,CLEAR_TOKEN} from '../actions/ActionType';

// TODO: [🐱👀] Чтение из localStorage в момент инициализации.
// Инициализация значения должна происходить не здесь,
// а при создании рутового редьюсера,
// вторым аргументом, как preloadedState
const initialState = '' || localStorage.getItem('token');

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case SAVE_TOKEN: {
            return payload;
        }
        case CLEAR_TOKEN:
            return initialState;
        default:
            return state;
    }
}
