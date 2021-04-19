import React from 'react';
import {shallow} from 'enzyme';
import ReactDOM from 'react-dom';
import Footer from '../Footer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const component = shallow(<Footer></Footer>);
  console.log(component.debug());
  const wrapper = component.find('footer');
  expect(wrapper.length).toBe(1);
  ReactDOM.render(<Footer></Footer>, div);
});
