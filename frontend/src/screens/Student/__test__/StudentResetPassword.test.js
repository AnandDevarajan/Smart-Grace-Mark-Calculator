import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import StudentResetPassword from '../StudentResetPassword';
import { Provider } from 'react-redux';
import store from '../../../store';

it('renders reset password component', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Provider store={store}>
        <StudentResetPassword />
      </Provider>
    </Router>,
    div
  );});
