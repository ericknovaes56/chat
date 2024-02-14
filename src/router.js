

import {
  Route,
  Routes,
  BrowserRouter as Router
} from "react-router-dom"

import { useState , useEffect } from "react";

import Load from "./pages/load";
import App from "./pages/app";

function AppRouter() {

  document.title="App - Discode"

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Load/>}></Route>
        <Route path='/app' element={<App/>}></Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
