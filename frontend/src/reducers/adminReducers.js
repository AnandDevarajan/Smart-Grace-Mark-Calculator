import {
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_PROFILE_UPDATE_REQUEST,
  ADMIN_PROFILE_UPDATE_SUCCESS,
  ADMIN_PROFILE_UPDATE_FAIL,
  ADMIN_PROFILE_UPDATE_RESET,
  ADMIN_PUBLISH_RESULT_REQUEST,
  ADMIN_PUBLISH_RESULT_SUCCESS,
  ADMIN_PUBLISH_RESULT_FAIL,
  ADMIN_PUBLISH_RESULT_RESET,
} from "../constants/adminConstants";

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

export const adminProfileUpdateReducer = (state = { admin: {} }, action) => {
  switch (action.type) {
    case ADMIN_PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case ADMIN_PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_PROFILE_UPDATE_RESET:
      return {
        admin: {},
      };
    default:
      return state;
  }
};

export const adminPublishResultReducer = (state = { message: {} }, action) => {
  switch (action.type) {
    case ADMIN_PUBLISH_RESULT_REQUEST:
      return { loading: true };
    case ADMIN_PUBLISH_RESULT_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case ADMIN_PUBLISH_RESULT_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_PUBLISH_RESULT_RESET:
      return {
        admin: {},
      };
    default:
      return state;
  }
};
