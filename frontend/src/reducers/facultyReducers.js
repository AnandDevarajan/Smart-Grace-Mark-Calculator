import {
  FACULTY_REGISTER_REQUEST,
  FACULTY_REGISTER_SUCCESS,
  FACULTY_REGISTER_FAIL,
  FACULTY_LOGIN_REQUEST,
  FACULTY_LOGIN_SUCCESS,
  FACULTY_LOGIN_FAIL,
  FACULTY_LOGOUT,
  FACULTY_LIST_REQUEST,
  FACULTY_LIST_SUCCESS,
  FACULTY_LIST_FAIL,
  ADVISER_BATCH_LIST_REQUEST,
  ADVISER_BATCH_LIST_SUCCESS,
  ADVISER_BATCH_LIST_FAIL,
  FACULTY_PROFILE_UPDATE_RESET,
  FACULTY_PROFILE_UPDATE_FAIL,
  FACULTY_PROFILE_UPDATE_SUCCESS,
  FACULTY_PROFILE_UPDATE_REQUEST,
} from '../constants/facultyConstants';

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

export const facultyListReducer = (state = { faculties: [] }, action) => {
  switch (action.type) {
    case FACULTY_LIST_REQUEST:
      return { loading: true, faculties: [] };
    case FACULTY_LIST_SUCCESS:
      return {
        loading: false,
        faculties: action.payload.faculties,
      };
    case FACULTY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adviserStudentListReducer = (state = { students: [] }, action) => {
  switch (action.type) {
    case ADVISER_BATCH_LIST_REQUEST:
      return { loading: true, students: [] };
    case ADVISER_BATCH_LIST_SUCCESS:
      return {
        loading: false,
        students: action.payload.students,
      };
    case ADVISER_BATCH_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const facultyProfileUpdateReducer = (
  state = { faculty: {} },
  action
) => {
  switch (action.type) {
    case FACULTY_PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case FACULTY_PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case FACULTY_PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case FACULTY_PROFILE_UPDATE_RESET:
      return {
        faculty: {},
      };
    default:
      return state;
  }
};
