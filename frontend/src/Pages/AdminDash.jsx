import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/admin/usersSlice';
import UserList from '../components/UsersList';
import { logout } from '../features/admin/adminSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../components/AdminHeader';


const AdminDash = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector(state => state.admin);

  const navigate = useNavigate()

  useEffect(() => {
    if (!admin) {
        navigate("/login");
    } else {
      dispatch(getUsers());
    }
  }, [admin, dispatch]);

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
};

  return (
    <>
    <Header/>
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Admin Dashboard</h2>
        <button className="btn btn-danger" onClick={onLogout}>Logout</button>
      </div>
      <UserList />
    </div>
    </>
  );
};

export default AdminDash;