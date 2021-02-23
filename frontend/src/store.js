import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  studentRegisterReducer,
  studentLoginReducer,
} from './reducers/studentReducer';

const reducer = combineReducers({
  studentSignup: studentRegisterReducer,
  studentSignin: studentLoginReducer,
});

const middleware = [thunk];

const studentInfoFromStorage = localStorage.getItem('studentInfo')
  ? JSON.parse(localStorage.getItem('studentInfo'))
  : null;

const initialState = {
  studentSignin: { studentInfo: studentInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
