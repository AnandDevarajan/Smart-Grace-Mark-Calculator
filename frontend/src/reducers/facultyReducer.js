import {
  FACULTY_REGISTER_REQUEST,
  FACULTY_REGISTER_SUCCESS,
  FACULTY_REGISTER_FAIL,
  FACULTY_LOGIN_REQUEST,
  FACULTY_LOGIN_SUCCESS,
  FACULTY_LOGIN_FAIL,
  FACULTY_LOGOUT,
} from '../constants/facultyConstant';

export const facultyRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case FACULTY_REGISTER_REQUEST:
      return { loading: true };
    case FACULTY_REGISTER_SUCCESS:
      return { loading: false, facultyInfo: action.payload };
    case FACULTY_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const facultyLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case FACULTY_LOGIN_REQUEST:
      return { loading: true };
    case FACULTY_LOGIN_SUCCESS:
      return { loading: false, facultyInfo: action.payload };
    case FACULTY_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case FACULTY_LOGOUT:
      return {};
    default:
      return state;
  }
};
