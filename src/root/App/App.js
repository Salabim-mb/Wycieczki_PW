import React from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Router from "root/Router";
import { AlertProvider } from 'context/AlertContext';
import AlertPopup from 'components/AlertPopup';

const App = () => (
  <AlertProvider>
    <BrowserRouter>
      <Router />
      <AlertPopup />
    </BrowserRouter>
  </AlertProvider>
)

export default App;
