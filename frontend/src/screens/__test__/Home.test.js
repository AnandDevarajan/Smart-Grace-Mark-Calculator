import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../Home';

it('renders Home component', () => {
  const div = document.createElement('div');
  const component = shallow(<Home></Home>);
  console.log(component.debug());
  const wrapper = component.find('.home');
  expect(wrapper.length).toBe(1);
  ReactDOM.render(
    <Router>
      <Home />
    </Router>,
    div
  );
});
