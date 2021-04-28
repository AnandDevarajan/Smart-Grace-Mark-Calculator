import {
  GRACEMARK_CREATE_FAIL,
  GRACEMARK_CREATE_SUCCESS,
  GRACEMARK_CREATE_REQUEST,
  GRACEMARK_LIST_REQUEST,
  GRACEMARK_LIST_SUCCESS,
  GRACEMARK_LIST_FAIL,
  GRACEMARK_DELETE_FAIL,
  GRACEMARK_DELETE_SUCCESS,
  GRACEMARK_DELETE_REQUEST,
  GRACEMARK_UPDATE_FAIL,
  GRACEMARK_UPDATE_REQUEST,
  GRACEMARK_UPDATE_SUCCESS,
  GRACEMARK_DETAILS_REQUEST,
  GRACEMARK_DETAILS_SUCCESS,
  GRACEMARK_DETAILS_FAIL,
} from "../constants/gracemarkConstants";
import axios from "axios";

export const createGracemark = (description, mark) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: GRACEMARK_CREATE_REQUEST,
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

    const { data } = await axios.post(
      "/gracemark",
      {
        description,
        mark,
      },
      config
    );
    dispatch({
      type: GRACEMARK_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GRACEMARK_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listGracemarks = () => async (dispatch) => {
  try {
    dispatch({
      type: GRACEMARK_LIST_REQUEST,
    });
    const { data } = await axios.get("/gracemark");
    dispatch({
      type: GRACEMARK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GRACEMARK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getGracemarkDetails = (gracemarkId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: GRACEMARK_DETAILS_REQUEST,
    });

    const {
      adminSignin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get(`/gracemark/${gracemarkId}`, config);

    dispatch({
      type: GRACEMARK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GRACEMARK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateGracemark = (gracemark) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GRACEMARK_UPDATE_REQUEST,
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
      `/gracemark/${gracemark.id}`,
      gracemark,
      config
    );

    dispatch({
      type: GRACEMARK_UPDATE_SUCCESS,
    });
    dispatch({
      type: GRACEMARK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GRACEMARK_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteGracemark = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GRACEMARK_DELETE_REQUEST,
    });

    const {
      adminSignin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    await axios.delete(`/gracemark/${id}`, config);

    dispatch({
      type: GRACEMARK_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: GRACEMARK_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
