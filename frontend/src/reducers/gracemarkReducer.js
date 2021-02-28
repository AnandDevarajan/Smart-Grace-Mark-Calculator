import {
  GRACEMARK_CREATE_FAIL,
  GRACEMARK_CREATE_SUCCESS,
  GRACEMARK_CREATE_REQUEST,
  GRACEMARK_CREATE_RESET,
} from '../constants/gracemarkConstant';

export const gracemarkCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GRACEMARK_CREATE_REQUEST:
      return { loading: true };
    case GRACEMARK_CREATE_SUCCESS:
      return { loading: false, gracemarkInfo: action.payload, success: true };
    case GRACEMARK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case GRACEMARK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
