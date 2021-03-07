import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  COURSE_ADD_MARKS_REQUEST,
  COURSE_ADD_MARKS_SUCCESS,
  COURSE_ADD_MARKS_FAIL,
} from '../constants/courseConstants';
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
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addCourseMarks = (id, total) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_ADD_MARKS_REQUEST,
    });

    const {
      facultySignin: { facultyInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${facultyInfo.token}`,
      },
    };

    const { data } = await axios.put(`/course/marks/${id}`, { total }, config);

    dispatch({
      type: COURSE_ADD_MARKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_ADD_MARKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
