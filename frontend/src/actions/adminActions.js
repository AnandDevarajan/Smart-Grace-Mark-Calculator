import {
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_PROFILE_UPDATE_FAIL,
  ADMIN_PROFILE_UPDATE_SUCCESS,
  ADMIN_PROFILE_UPDATE_REQUEST,
  ADMIN_PUBLISH_RESULT_FAIL,
  ADMIN_PUBLISH_RESULT_SUCCESS,
  ADMIN_PUBLISH_RESULT_REQUEST,
} from "../constants/adminConstants";

import { GRACEMARK_DETAILS_RESET } from "../constants/gracemarkConstants";
import axios from "axios";

export const adminLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/admin/login",
      { email, password },
      config
    );
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("adminInfo", JSON.stringify(data));
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
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/admin",
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

    localStorage.setItem("adminInfo", JSON.stringify(data));
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
  localStorage.removeItem("adminInfo");
  dispatch({
    type: ADMIN_LOGOUT,
  });
  dispatch({
    type: GRACEMARK_DETAILS_RESET,
  });
  document.location.href = "/";
};

export const updateAdminProfile = (id, email, phone, address) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ADMIN_PROFILE_UPDATE_REQUEST,
    });

    const {
      adminSignin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/admin/${id}`,
      { email, phone, address },
      config
    );

    dispatch({
      type: ADMIN_PROFILE_UPDATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
