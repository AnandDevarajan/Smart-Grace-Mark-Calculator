import {COURSE_LIST_REQUEST,COURSE_LIST_SUCCESS,COURSE_LIST_FAIL} from '../constants/courseConstant';

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