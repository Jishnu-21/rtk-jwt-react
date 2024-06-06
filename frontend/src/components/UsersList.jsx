import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser, editUser, filterUser } from '../features/admin/usersSlice';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import { Modal, Button, Form } from 'react-bootstrap';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, isLoading, isError, message } = useSelector(state => state.users);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editedUserData, setEditedUserData] = useState({ name: '', email: '' });
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getUsers());
  }, [isError, message, dispatch]);

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  const onEdit = (id, name, email) => {
    setSelectedUserId(id);
    setEditedUserData({ name, email });
    setShowModal(true);
  };

  const onSearch = (e) => {
    e.preventDefault();
    dispatch(filterUser(search));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditUser = () => {
    dispatch(editUser({ userId: selectedUserId, userData: editedUserData }));
    handleCloseModal();
  };

  if (isLoading) {
    return <Oval color="#00BFFF" height={50} width={50} />;
  }

  return (
    <div>
      <form onSubmit={onSearch} className="mb-3">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="btn btn-outline-secondary" type="submit">Search</button>
        </div>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isBlocked ? 'Blocked' : 'Active'}</td>
              <td>
              <button className="btn btn-primary me-2" onClick={() => onEdit(user._id, user.name, user.email)}>Edit</button>
                <button className="btn btn-danger" onClick={() => onDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={editedUserData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={editedUserData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser(selectedUserId)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
