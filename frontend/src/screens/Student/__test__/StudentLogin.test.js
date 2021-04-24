import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import StudentLogin from '../StudentLogin';
import { Provider } from 'react-redux';
import store from '../../../store';

it('renders student login component', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Provider store={store}>
        <StudentLogin />
      </Provider>
    </Router>,

  );});
