import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  studentRegisterReducer,
  studentLoginReducer,
  studentListReducer,
  studentRequestReducer,
  requestAcceptReducer,
  requestRejectReducer,
  courseStudentListReducer,
  courseStudentMarkListReducer,
  studentProfileUpdateReducer,
} from './reducers/studentReducers';
import {
  adminRegisterReducer,
  adminLoginReducer,
} from './reducers/adminReducers';
import {
  facultyRegisterReducer,
  facultyLoginReducer,
  facultyListReducer,
  adviserStudentListReducer,
} from './reducers/facultyReducers';

import {
  gracemarkCreateReducer,
  gracemarkListReducer,
  gracemarkDeleteReducer,
  gracemarkUpdateReducer,
  gracemarkDetailsReducer,
} from './reducers/gracemarkReducers';
import {
  courseListReducer,
  courseAddMarkListReducer,
  courseMarkListReducer,
  coursemarkUpdateReducer,
  courseDetailsReducer,
  courseDeptListReducer,
} from './reducers/courseReducers';

const reducer = combineReducers({
  studentSignup: studentRegisterReducer,
  studentSignin: studentLoginReducer,
  studentList: studentListReducer,
  courseStudentList: courseStudentListReducer,
  studentRequest: studentRequestReducer,
  requestAccept: requestAcceptReducer,
  requestReject: requestRejectReducer,
  studentProfileUpdate: studentProfileUpdateReducer,
  adminSignup: adminRegisterReducer,
  adminSignin: adminLoginReducer,
  facultySignup: facultyRegisterReducer,
  facultySignin: facultyLoginReducer,
  facultyList: facultyListReducer,
  adviserStudentList: adviserStudentListReducer,
  gracemarkCreate: gracemarkCreateReducer,
  gracemarkList: gracemarkListReducer,
  gracemarkUpdate: gracemarkUpdateReducer,
  gracemarkDetails: gracemarkDetailsReducer,
  gracemarkDelete: gracemarkDeleteReducer,
  courseList: courseListReducer,
  courseAddMark: courseAddMarkListReducer,
  courseMarkList: courseMarkListReducer,
  coursemarkUpdate: coursemarkUpdateReducer,
  courseDetails: courseDetailsReducer,
  courseDeptList: courseDeptListReducer,
  courseStudentMarkList: courseStudentMarkListReducer,
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
