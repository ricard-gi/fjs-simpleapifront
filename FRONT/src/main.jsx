import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

import './index.css'
import App from './App'


import Inici from "./elements/Inici";
import Secret from "./elements/Secret";
import Open from "./elements/Open";
import LlistaUsuaris from "./elements/LlistaUsuaris";
import Registre from "./elements/Registre";



ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Inici />} />
        <Route path="registre" element={<Registre />} />
        <Route path="usuaris" element={<LlistaUsuaris />} />
        <Route path="secret" element={<Secret />} />
        <Route path="open" element={<Open />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
