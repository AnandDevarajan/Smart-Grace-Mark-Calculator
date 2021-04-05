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
  FACULTY_PROFILE_UPDATE_REQUEST,
  FACULTY_PROFILE_UPDATE_SUCCESS,
  FACULTY_PROFILE_UPDATE_FAIL,
} from '../constants/facultyConstants';

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
  adviser,
  department,
  courseId,
  batch,
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
        adviser,
        department,
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

export const listFaculties = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FACULTY_LIST_REQUEST,
    });

    const {
      adminSignin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axios.get('/admin/faculties', config);

    dispatch({
      type: FACULTY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FACULTY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAdviserBatch = (batch) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADVISER_BATCH_LIST_REQUEST,
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
    const { data } = await axios.get(
      `/faculty/adviser/students/${batch}`,
      config
    );
    dispatch({
      type: ADVISER_BATCH_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADVISER_BATCH_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateFacultyProfile = (id, email, phone, address) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: FACULTY_PROFILE_UPDATE_REQUEST,
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
      `/faculty/${id}`,
      { email, phone, address },
      config
    );

    dispatch({
      type: FACULTY_PROFILE_UPDATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: FACULTY_PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
