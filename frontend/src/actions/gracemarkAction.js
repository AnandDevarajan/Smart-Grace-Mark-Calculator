import {
  GRACEMARK_CREATE_FAIL,
  GRACEMARK_CREATE_SUCCESS,
  GRACEMARK_CREATE_REQUEST,
  GRACEMARK_LIST_REQUEST,
  GRACEMARK_LIST_SUCCESS,
  GRACEMARK_LIST_FAIL,
} from '../constants/gracemarkConstant';
import axios from 'axios';
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
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.post(
      '/gracemark',
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
    const { data } = await axios.get('/gracemark');
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
