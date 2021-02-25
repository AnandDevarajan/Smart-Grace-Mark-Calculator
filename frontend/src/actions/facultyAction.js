import {
  FACULTY_REGISTER_REQUEST,
  FACULTY_REGISTER_SUCCESS,
  FACULTY_REGISTER_FAIL,
  FACULTY_LOGIN_REQUEST,
  FACULTY_LOGIN_SUCCESS,
  FACULTY_LOGIN_FAIL,
  FACULTY_LOGOUT,
} from '../constants/facultyConstant';

import axios from 'axios';

export const facultyLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: FACULTY_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/faculty/login',
      { email, password },
      config
    );
    dispatch({
      type: FACULTY_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('facultyInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: FACULTY_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const facultyRegister = (
  name,
  email,
  password,
  dob,
  department,
  batch,
  adviser,
  courseId,
  gender,
  phone,
  address
) => async (dispatch) => {
  try {
    dispatch({
      type: FACULTY_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/faculty',
      {
        name,
        email,
        password,
        dob,
        department,
        adviser,
        courseId,
        batch,
        gender,
        phone,
        address,
      },
      config
    );
    dispatch({
      type: FACULTY_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: FACULTY_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('facultyInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: FACULTY_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const facultyLogout = () => (dispatch) => {
  localStorage.removeItem('facultyInfo');
  dispatch({
    type: FACULTY_LOGOUT,
  });
  document.location.href = '/';
};
