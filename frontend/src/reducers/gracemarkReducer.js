import {
  GRACEMARK_CREATE_FAIL,
  GRACEMARK_CREATE_SUCCESS,
  GRACEMARK_CREATE_REQUEST,
  GRACEMARK_CREATE_RESET,
  GRACEMARK_LIST_REQUEST,
  GRACEMARK_LIST_SUCCESS,
  GRACEMARK_LIST_FAIL,
  GRACEMARK_DELETE_REQUEST,
  GRACEMARK_DELETE_SUCCESS,
  GRACEMARK_DELETE_FAIL,
  GRACEMARK_UPDATE_REQUEST,
  GRACEMARK_UPDATE_SUCCESS,
  GRACEMARK_UPDATE_FAIL,
  GRACEMARK_UPDATE_RESET,
  GRACEMARK_DETAILS_REQUEST,
  GRACEMARK_DETAILS_SUCCESS,
  GRACEMARK_DETAILS_FAIL,
  GRACEMARK_DETAILS_RESET,
} from '../constants/gracemarkConstant';

export const gracemarkCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GRACEMARK_CREATE_REQUEST:
      return { loading: true };
    case GRACEMARK_CREATE_SUCCESS:
      return { loading: false, gracemarkInfo: action.payload, success: true };
    case GRACEMARK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case GRACEMARK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const gracemarkListReducer = (state = { gracemarks: [] }, action) => {
  switch (action.type) {
    case GRACEMARK_LIST_REQUEST:
      return { loading: true, gracemarks: [] };
    case GRACEMARK_LIST_SUCCESS:
      return {
        loading: false,
        gracemarks: action.payload.gracemarks,
      };
    case GRACEMARK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const gracemarkDetailsReducer = (state = { gracemark: {} }, action) => {
  switch (action.type) {
    case GRACEMARK_DETAILS_REQUEST:
      return { ...state, loading: true };
    case GRACEMARK_DETAILS_SUCCESS:
      return { loading: false, gracemark: action.payload };
    case GRACEMARK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case GRACEMARK_DETAILS_RESET:
      return { gracemark: {} };
    default:
      return state;
  }
};

export const gracemarkDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case GRACEMARK_DELETE_REQUEST:
      return { loading: true };
    case GRACEMARK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case GRACEMARK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const gracemarkUpdateReducer = (state = { gracemark: {} }, action) => {
  switch (action.type) {
    case GRACEMARK_UPDATE_REQUEST:
      return { loading: true };
    case GRACEMARK_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case GRACEMARK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case GRACEMARK_UPDATE_RESET:
      return {
        gracemark: {},
      };
    default:
      return state;
  }
};
