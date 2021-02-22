import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
// import { Provider } from 'react-redux';
// import store from './store';
import App from './App';

{
  /* <Provider store={store}>
<App />
</Provider>, */
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
