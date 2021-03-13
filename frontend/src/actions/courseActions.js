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
  COURSE_MARK_DETAILS_FAIL,
  COURSE_MARK_DETAILS_SUCCESS,
  COURSE_MARK_DETAILS_REQUEST,
  COURSE_MARK_UPDATE_SUCCESS,
  COURSE_MARK_UPDATE_REQUEST,
  COURSE_MARK_UPDATE_FAIL,
  COURSE_DEPT_LIST_FAIL,
  COURSE_DEPT_LIST_SUCCESS,
  COURSE_DEPT_LIST_REQUEST,
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

export const listDeptCourses = (department) => async (dispatch) => {
  try {
    dispatch({
      type: COURSE_DEPT_LIST_REQUEST,
    });
    const { data } = await axios.get(`/course/${department}`);
    dispatch({
      type: COURSE_DEPT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_DEPT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCourseMarks = (cid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_MARK_LIST_REQUEST,
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

    const { data } = await axios.get(`/course/markList/${cid}`, config);
    dispatch({
      type: COURSE_MARK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_MARK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addCourseMarks = (id, cid, internals, mark, total) => async (
  dispatch,
  getState
) => {
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

    const { data } = await axios.put(
      `/course/marks/${cid}`,
      { id, internals, mark, total },
      config
    );

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

export const updateCoursemark = (id, cid, internals, marks) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: COURSE_MARK_UPDATE_REQUEST,
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

    const { data } = await axios.put(
      `/course/mark/update/${cid}`,
      { internals, marks, id },
      config
    );

    dispatch({
      type: COURSE_MARK_UPDATE_SUCCESS,
    });
    dispatch({
      type: COURSE_MARK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_MARK_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCoursemarkDetails = (editID) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_MARK_DETAILS_REQUEST,
    });

    const {
      facultySignin: { facultyInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${facultyInfo.token}`,
      },
    };

    const { data } = await axios.get(`/course/mark/edit/${editID}`, config);

    dispatch({
      type: COURSE_MARK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_MARK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
