import {
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
} from '../constants/adminConstant';

import { GRACEMARK_DETAILS_RESET } from '../constants/gracemarkConstant';
import axios from 'axios';

export const adminLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/admin/login',
      { email, password },
      config
    );
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('adminInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminRegister = (
  name,
  email,
  password,
  dob,
  gender,
  phone,
  address
) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/admin',
      {
        name,
        email,
        password,
        dob,
        gender,
        phone,
        address,
      },
      config
    );
    dispatch({
      type: ADMIN_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('adminInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminLogout = () => (dispatch) => {
  localStorage.removeItem('adminInfo');
  dispatch({
    type: ADMIN_LOGOUT,
  });
  dispatch({
    type: GRACEMARK_DETAILS_RESET,
  });
  document.location.href = '/';
};
