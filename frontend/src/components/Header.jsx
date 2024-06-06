import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    };

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container fluid> {/* Use fluid prop to make Container take up full width */}
                    <LinkContainer to='/'>
                        <Navbar.Brand>My App</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            {user ? (
                                <>
                                
                                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <LinkContainer to='/'>
                                        <Nav.Link><FaSignInAlt /> Sign In</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/register'>
                                        <Nav.Link><FaSignOutAlt /> Sign Up</Nav.Link>
                                    </LinkContainer>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
