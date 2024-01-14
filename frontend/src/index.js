import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Renderuje główny komponent App w elemencie o id 'root'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);