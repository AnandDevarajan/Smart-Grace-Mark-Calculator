import {
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_REGISTER_FAIL,
  STUDENT_LOGIN_REQUEST,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGOUT,
  STUDENT_LIST_FAIL,
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_REQUEST,
  REQUEST_ADD_FAIL,
  REQUEST_ADD_SUCCESS,
  REQUEST_ADD_REQUEST,
  REQUEST_ACCEPT_REQUEST,
  REQUEST_ACCEPT_SUCCESS,
  REQUEST_ACCEPT_FAIL,
  REQUEST_REJECT_SUCCESS,
  REQUEST_REJECT_FAIL,
  REQUEST_REJECT_REQUEST,
  REQUEST_ADD_RESET,
  STUDENT_LIST_COURSE_FAIL,
  STUDENT_LIST_COURSE_SUCCESS,
  STUDENT_LIST_COURSE_REQUEST,
  STUDENT_COURSE_MARK_REQUEST,
  STUDENT_COURSE_MARK_SUCCESS,
  STUDENT_COURSE_MARK_FAIL,
} from '../constants/studentConstants';

export const studentRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_REGISTER_REQUEST:
      return { loading: true };
    case STUDENT_REGISTER_SUCCESS:
      return { loading: false, studentInfo: action.payload };
    case STUDENT_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_LOGIN_REQUEST:
      return { loading: true };
    case STUDENT_LOGIN_SUCCESS:
      return { loading: false, studentInfo: action.payload };
    case STUDENT_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const studentListReducer = (state = { students: [] }, action) => {
  switch (action.type) {
    case STUDENT_LIST_REQUEST:
      return { loading: true, students: [] };
    case STUDENT_LIST_SUCCESS:
      return {
        loading: false,
        students: action.payload.students,
      };
    case STUDENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseStudentListReducer = (state = { students: [] }, action) => {
  switch (action.type) {
    case STUDENT_LIST_COURSE_REQUEST:
      return { loading: true, students: [] };
    case STUDENT_LIST_COURSE_SUCCESS:
      return {
        loading: false,
        students: action.payload.students,
      };
    case STUDENT_LIST_COURSE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseStudentMarkListReducer = (
  state = { students: [] },
  action
) => {
  switch (action.type) {
    case STUDENT_COURSE_MARK_REQUEST:
      return { loading: true, students: [] };
    case STUDENT_COURSE_MARK_SUCCESS:
      return {
        loading: false,
        students: action.payload.students,
      };
    case STUDENT_COURSE_MARK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_ADD_REQUEST:
      return { loading: true };
    case REQUEST_ADD_SUCCESS:
      return { loading: false, studentInfo: action.payload, success: true };
    case REQUEST_ADD_FAIL:
      return { loading: false, error: action.payload };
    case REQUEST_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const requestAcceptReducer = (state = { students: [] }, action) => {
  switch (action.type) {
    case REQUEST_ACCEPT_REQUEST:
      return { loading: true, students: [] };
    case REQUEST_ACCEPT_SUCCESS:
      return { loading: false, students: action.payload.students };
    case REQUEST_ACCEPT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const requestRejectReducer = (state = { students: [] }, action) => {
  switch (action.type) {
    case REQUEST_REJECT_REQUEST:
      return { loading: true, students: [] };
    case REQUEST_REJECT_SUCCESS:
      return { loading: false, students: action.payload.students };
    case REQUEST_REJECT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
