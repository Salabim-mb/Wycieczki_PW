import React from 'react'
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Router from "root/Router";

import Category from '../../components/Category'

const App = () => (
  <BrowserRouter>
    <Router />
    <Category />
  </BrowserRouter>
);


export default App;
