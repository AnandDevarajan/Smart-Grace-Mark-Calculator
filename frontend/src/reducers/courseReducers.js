import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  COURSE_ADD_MARKS_REQUEST,
  COURSE_ADD_MARKS_SUCCESS,
  COURSE_ADD_MARKS_FAIL,
  COURSE_MARK_LIST_FAIL,
  COURSE_MARK_LIST_SUCCESS,
  COURSE_MARK_LIST_REQUEST,
  COURSE_MARK_UPDATE_REQUEST,
  COURSE_MARK_UPDATE_SUCCESS,
  COURSE_MARK_UPDATE_FAIL,
  COURSE_MARK_UPDATE_RESET,
  COURSE_MARK_DETAILS_REQUEST,
  COURSE_MARK_DETAILS_SUCCESS,
  COURSE_MARK_DETAILS_FAIL,
  COURSE_MARK_DETAILS_RESET,
  COURSE_DEPT_LIST_REQUEST,
  COURSE_DEPT_LIST_SUCCESS,
  COURSE_DEPT_LIST_FAIL,
  GRADE_RANGE_UPDATE_REQUEST,
  GRADE_RANGE_UPDATE_SUCCESS,
  GRADE_RANGE_UPDATE_FAIL,
  GRADE_RANGE_UPDATE_RESET,
  GRADE_RANGE_DETAILS_RESET,
  GRADE_RANGE_DETAILS_FAIL,
  GRADE_RANGE_DETAILS_SUCCESS,
  GRADE_RANGE_DETAILS_REQUEST,
} from '../constants/courseConstants';

export const courseListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case COURSE_LIST_REQUEST:
      return { loading: true, courses: [] };
    case COURSE_LIST_SUCCESS:
      return {
        loading: false,
        courses: action.payload.courses,
      };
    case COURSE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseDeptListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case COURSE_DEPT_LIST_REQUEST:
      return { loading: true, courses: [] };
    case COURSE_DEPT_LIST_SUCCESS:
      return {
        loading: false,
        courses: action.payload.courses,
      };
    case COURSE_DEPT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseAddMarkListReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_ADD_MARKS_REQUEST:
      return { loading: true };
    case COURSE_ADD_MARKS_SUCCESS:
      return {
        loading: false,
        data: action.payload.message,
      };
    case COURSE_ADD_MARKS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseMarkListReducer = (state = { markList: [] }, action) => {
  switch (action.type) {
    case COURSE_MARK_LIST_REQUEST:
      return { loading: true, markList: [] };
    case COURSE_MARK_LIST_SUCCESS:
      return {
        loading: false,
        markList: action.payload.markList,
      };
    case COURSE_MARK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const coursemarkUpdateReducer = (
  state = { updatedMark: {} },
  action
) => {
  switch (action.type) {
    case COURSE_MARK_UPDATE_REQUEST:
      return { loading: true };
    case COURSE_MARK_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case COURSE_MARK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case COURSE_MARK_UPDATE_RESET:
      return {
        updatedMark: {},
      };
    default:
      return state;
  }
};

export const courseDetailsReducer = (state = { markList: {} }, action) => {
  switch (action.type) {
    case COURSE_MARK_DETAILS_REQUEST:
      return { ...state, loading: true };
    case COURSE_MARK_DETAILS_SUCCESS:
      return { loading: false, markList: action.payload.markList };
    case COURSE_MARK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case COURSE_MARK_DETAILS_RESET:
      return { markList: {} };
    default:
      return state;
  }
};

export const gradeRangeUpdateReducer = (state = { gradeRange: {} }, action) => {
  switch (action.type) {
    case GRADE_RANGE_UPDATE_REQUEST:
      return { loading: true };
    case GRADE_RANGE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case GRADE_RANGE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case GRADE_RANGE_UPDATE_RESET:
      return {
        gradeRange: {},
      };
    default:
      return state;
  }
};

export const gradeRangeReducer = (state = { grade: {} }, action) => {
  switch (action.type) {
    case GRADE_RANGE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case GRADE_RANGE_DETAILS_SUCCESS:
      return { loading: false, grade: action.payload.grade };
    case GRADE_RANGE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case GRADE_RANGE_DETAILS_RESET:
      return { grade: {} };
    default:
      return state;
  }
};
