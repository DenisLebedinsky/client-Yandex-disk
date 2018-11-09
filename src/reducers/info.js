import { FETCH_INFO_DISK_SUCCES, CLEAR_INFO } from './../ActionType';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_INFO_DISK_SUCCES:
      return payload.user;
    case CLEAR_INFO:
      return {};
    default:
      return state;
  }
};
