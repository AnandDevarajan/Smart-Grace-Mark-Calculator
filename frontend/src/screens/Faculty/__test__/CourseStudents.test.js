import React from 'react';
import ReactDOM from 'react-dom';
import CourseStudents from '../CourseStudents';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CourseStudents />, div);
});

export default CourseStudents.test;
