import { FETCH_RESOURCES_SUCCES, CLEAR_RESOURCES } from '../actions/ActionType';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_RESOURCES_SUCCES:
      return payload._embedded;
    case CLEAR_RESOURCES:
      return {};
    default:
      return state;
  }
}
