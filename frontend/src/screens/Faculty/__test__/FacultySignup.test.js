import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import FacultySignup from '../FacultySignup';
import { Provider } from 'react-redux';
import store from '../../../store';

it('renders faculty signup component', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Provider store={store}>
        <FacultySignup />
      </Provider>
    </Router>,
    div
  );});
