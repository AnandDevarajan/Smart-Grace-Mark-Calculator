import React from 'react';
import ReactDOM from 'react-dom';
import FormContainer from '../FormContainer';

it('renders form container', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FormContainer></FormContainer>, div);
});
