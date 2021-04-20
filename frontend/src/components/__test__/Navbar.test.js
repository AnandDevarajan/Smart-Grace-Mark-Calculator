import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../Navbar';
import { Provider } from 'react-redux';
import store from '../../store';

it('renders Navbar component', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </Router>,
    div
  );});
