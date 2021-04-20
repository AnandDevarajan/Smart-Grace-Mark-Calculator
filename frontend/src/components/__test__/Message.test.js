import React from 'react';
import ReactDOM from 'react-dom';
import Message from '../Message';

it('renders message component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Message></Message>, div);
});
