import {
  GRACEMARK_CREATE_FAIL,
  GRACEMARK_CREATE_SUCCESS,
  GRACEMARK_CREATE_REQUEST,
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
