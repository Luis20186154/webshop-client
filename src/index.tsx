import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContex';
import ClientContextProvider from './contexts/ClientContext';

//TODO: <React.StrictMode> <--- poner esto

ReactDOM.render(
  <AuthContextProvider>
    <ClientContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClientContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);
