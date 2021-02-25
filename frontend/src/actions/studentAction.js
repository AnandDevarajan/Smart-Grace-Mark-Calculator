import {
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_REGISTER_FAIL,
  STUDENT_LOGIN_REQUEST,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGOUT,
} from '../constants/studentConstant';

import axios from 'axios';

export const studentLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/student/login',
      { email, password },
      config
    );
    dispatch({
      type: STUDENT_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('studentInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: STUDENT_LOGIN_FAIL,
      payload:
        error.response || error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const studentRegister = (
  name,
  email,
  password,
  rollno,
  dob,
  branch,
  batch,
  degree,
  gender,
  phone,
  address
) => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/student',
      {
        name,
        email,
        password,
        rollno,
        dob,
        branch,
        batch,
        degree,
        gender,
        phone,
        address,
      },
      config
    );
    dispatch({
      type: STUDENT_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: STUDENT_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('studentInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: STUDENT_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const studentLogout = () => (dispatch) => {
  localStorage.removeItem('studentInfo');
  dispatch({
    type: STUDENT_LOGOUT,
  });
  document.location.href = '/';
};
