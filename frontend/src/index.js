import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthState from './context/auth/AuthState'
ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <App data='hello' />
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);