import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { login, reset } from "../features/admin/adminSlice";
import Header from '../components/Header';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/admin");
    }
    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password
    };
    dispatch(login(userData));
  };

  return (
    <>
      <Header />
      <FormContainer>
        <h1>Admin Sign In</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            disabled={isLoading}
            type='submit'
            variant='primary'
            className='mt-3'
          >
            Sign In
          </Button>
        </Form>

        {isLoading && <Loader />}

        <div className='py-3'>
          <span>New Customer? </span>
          <Link to='/register'>Register</Link>
        </div>
      </FormContainer>
    </>
  );
};

export default AdminLogin;
