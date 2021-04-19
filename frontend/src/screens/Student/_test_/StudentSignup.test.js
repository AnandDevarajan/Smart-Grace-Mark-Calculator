import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import StudentSignup from '../StudentSignup';
import { Provider } from 'react-redux';
import store from '../../../store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Provider store={store}>
        <StudentSignup />
      </Provider>
    </Router>,
    div
  );});
