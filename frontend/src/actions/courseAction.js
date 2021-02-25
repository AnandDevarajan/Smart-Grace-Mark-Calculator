import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
} from '../constants/courseConstant';
import axios from 'axios';

export const listCourses = () => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_LIST_REQUEST,
    });
    const { data } = await axios.get('/course');
    dispatch({
      type: COURSE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_LIST_FAIL,
      payload: 'No Courses',
    });
  }
};
