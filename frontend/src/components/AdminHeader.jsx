import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/admin/adminSlice';
import { useNavigate, Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { admin } = useSelector((state) => state.admin);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg" fixed="top" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/" className="font-weight-bold">
                    MyApp
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto align-items-center">
                            <>
                                <Button 
                                    variant="outline-light" 
                                    onClick={handleLogout} 
                                    className="d-flex align-items-right"
                                >
                                    <FaSignOutAlt className="mr-2" />
                                    Logout
                                </Button>
                            </>
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;