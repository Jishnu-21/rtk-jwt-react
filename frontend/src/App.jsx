import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import AdminLogin from './Pages/AdminLogin';
import AdminDash from './Pages/AdminDash';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          <Route path="/profile" element={
              <Profile />
          } />
          <Route path="/admin/login" element={
            <PublicRoute adminRoute={true}>
              <AdminLogin />
            </PublicRoute>
          } />
          <Route path="/admin" element={
            <PrivateRoute adminRoute={true}>
              <AdminDash />
            </PrivateRoute>
          } />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;