import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Session from 'react-session-persist';

ReactDOM.render(
  <React.StrictMode>
    <Session>
      <App />
    </Session>
  </React.StrictMode>,
  document.getElementById('root')
);
