import React from 'react'
import './App.css';
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from "react-router-dom";
import Router from "root/Router";
import theme from 'constants/theme';

const App = () => (
  < ThemeProvider theme={theme} >
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </  ThemeProvider>
);

export default App;
