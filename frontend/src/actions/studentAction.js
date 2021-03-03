import {
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_REGISTER_FAIL,
  STUDENT_LOGIN_REQUEST,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGOUT,
  STUDENT_LIST_FAIL,
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_REQUEST,
  REQUEST_ADD_FAIL,
  REQUEST_ADD_SUCCESS,
  REQUEST_ADD_REQUEST,
  REQUEST_ACCEPT_REQUEST,
  REQUEST_ACCEPT_SUCCESS,
  REQUEST_ACCEPT_FAIL,
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

export const listStudents = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_LIST_REQUEST,
    });

    const {
      adminSignin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axios.get('/admin/students', config);

    dispatch({
      type: STUDENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const studentRequest = (request) => async (dispatch, getState) => {
  console.log(request);
  try {
    dispatch({
      type: REQUEST_ADD_REQUEST,
    });

    const {
      studentSignin: { studentInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/student/request/${studentInfo.result.RollNum}`,
      { request },
      config
    );

    dispatch({
      type: REQUEST_ADD_SUCCESS,
      payload: data,
    });
    localStorage.setItem('studentInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REQUEST_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const requestAccept = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: REQUEST_ACCEPT_REQUEST,
//     });

//     const {
//       adminSignin: { adminInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${adminInfo.token}`,
//       },
//     };
//     const { data } = await axios.put(
//       `/admin/student/request/accept/${id}`,
//       config
//     );

//     dispatch({
//       type: REQUEST_ACCEPT_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: REQUEST_ACCEPT_FAIL,
//       payload: 
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
