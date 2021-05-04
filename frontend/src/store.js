import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

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
  studentGetReducer,
} from "./reducers/studentReducers";
import {
  adminRegisterReducer,
  adminLoginReducer,
  adminProfileUpdateReducer,
} from "./reducers/adminReducers";
import {
  facultyRegisterReducer,
  facultyLoginReducer,
  facultyListReducer,
  adviserStudentListReducer,
  facultyProfileUpdateReducer,
} from "./reducers/facultyReducers";

import {
  gracemarkCreateReducer,
  gracemarkListReducer,
  gracemarkDeleteReducer,
  gracemarkUpdateReducer,
  gracemarkDetailsReducer,
} from "./reducers/gracemarkReducers";
import {
  courseListReducer,
  courseAddMarkListReducer,
  courseMarkListReducer,
  coursemarkUpdateReducer,
  courseDetailsReducer,
  courseDeptListReducer,
  gradeRangeReducer,
  gradeRangeUpdateReducer,
  allGradeRangeReducer,
  rangeReducer,
} from "./reducers/courseReducers";

const reducer = combineReducers({
  studentSignup: studentRegisterReducer,
  studentSignin: studentLoginReducer,
  studentList: studentListReducer,
  studentGet: studentGetReducer,
  courseStudentList: courseStudentListReducer,
  studentRequest: studentRequestReducer,
  requestAccept: requestAcceptReducer,
  requestReject: requestRejectReducer,
  studentProfileUpdate: studentProfileUpdateReducer,
  adminSignup: adminRegisterReducer,
  adminSignin: adminLoginReducer,
  adminProfileUpdate: adminProfileUpdateReducer,
  facultySignup: facultyRegisterReducer,
  facultySignin: facultyLoginReducer,
  facultyList: facultyListReducer,
  facultyProfileUpdate: facultyProfileUpdateReducer,
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
  allGradeRange: allGradeRangeReducer,
  rangeDet: rangeReducer,
  gradeRange: gradeRangeReducer,
  gradeRangeUpdate: gradeRangeUpdateReducer,
});

const middleware = [thunk];

const studentInfoFromStorage = localStorage.getItem("studentInfo")
  ? JSON.parse(localStorage.getItem("studentInfo"))
  : null;

const adminInfoFromStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;

const facultyInfoFromStorage = localStorage.getItem("facultyInfo")
  ? JSON.parse(localStorage.getItem("facultyInfo"))
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
