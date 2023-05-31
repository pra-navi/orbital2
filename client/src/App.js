//create all routes here
import React from 'react';

import {BrowserRouter, Navigate, Routes, Route, Outlet, } from 'react-router-dom'
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import { useSelector } from 'react-redux';

// create 2 private react componenets; because right now file is still small 
// can still put here else might want to put somewhere else

const PrivateRoute = () => {
  const { isAuth } = useSelector((state) => state.auth)
  return <>{isAuth ? <Outlet /> : <Navigate to="/login" /> }</>
}

const RestrictedRoute = () => {
  const { isAuth } = useSelector((state) => state.auth)
  return <>{isAuth ? <Navigate to="/dashboard" /> : <Outlet /> }</>
}

// need to put navbar outside of routes
const App = () => {
  return (
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home />} />

      <Route element={<PrivateRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route element={<RestrictedRoute />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Route>

    </Routes>
  </BrowserRouter>
  )
}

export default App;