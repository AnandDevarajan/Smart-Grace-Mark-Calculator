import {
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
} from '../constants/adminConstant';

export const adminRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_REGISTER_REQUEST:
      return { loading: true };
    case ADMIN_REGISTER_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { loading: true };
    case ADMIN_LOGIN_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_LOGOUT:
      return {};
    default:
      return state;
  }
};
