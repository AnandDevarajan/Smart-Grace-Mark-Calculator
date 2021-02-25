import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  studentRegisterReducer,
  studentLoginReducer,
} from './reducers/studentReducer';
import {
  adminRegisterReducer,
  adminLoginReducer,
} from './reducers/adminReducer';
import {
  facultyRegisterReducer,
  facultyLoginReducer,
} from './reducers/facultyReducer';

const reducer = combineReducers({
  studentSignup: studentRegisterReducer,
  studentSignin: studentLoginReducer,
  adminSignup: adminRegisterReducer,
  adminSignin: adminLoginReducer,
  facultySignup: facultyRegisterReducer,
  facultySignin: facultyLoginReducer,
});

const middleware = [thunk];

const studentInfoFromStorage = localStorage.getItem('studentInfo')
  ? JSON.parse(localStorage.getItem('studentInfo'))
  : null;

const adminInfoFromStorage = localStorage.getItem('adminInfo')
  ? JSON.parse(localStorage.getItem('adminInfo'))
  : null;

const facultyInfoFromStorage = localStorage.getItem('facultyInfo')
  ? JSON.parse(localStorage.getItem('facultyInfo'))
  : null;

const initialState = {
  studentSignin: { studentInfo: studentInfoFromStorage },
  adminSignin: { adminInfo: adminInfoFromStorage },
  facultySignin: { facultyInfo: facultyInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
