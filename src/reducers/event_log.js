import {
  DEL_FOLDER_SUCCES,
  CREATE_FOLDER_SUCCES,
  UPLOAD_FILE_SUCCES,
} from '../ActionType';

const initialState = {
  status: '',
  show: false,
};

// так лучше не делать, функция без имени, как её потом искать в проекте

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case DEL_FOLDER_SUCCES:
      return {
        ...state,
        status: payload,
        show: true,
      };
    case CREATE_FOLDER_SUCCES:
      return {
        ...state,
        status: payload,
        show: true,
      };
    case UPLOAD_FILE_SUCCES:
      return {
        ...state,
        status: payload,
        show: true,
      };
    default:
      return state;
  }
};
