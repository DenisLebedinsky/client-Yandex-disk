import { OPEN_MODAL, CLOSE_MODAL } from './../ActionType';
/**
 * зачем объявлять обект с одним ключом
 * надо было просто сделать state = false
 */
export default (state = { isOpen: false }, { type }) => {
  switch (type) {
    case OPEN_MODAL:
      return { ...state, isOpen: true };
    case CLOSE_MODAL:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};
