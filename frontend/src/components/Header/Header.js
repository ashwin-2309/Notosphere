import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  Navbar,
  Nav,
  Container,
  NavDropdown,
} from "react-bootstrap";
const Header = () => {
  const history = useNavigate();
  return (
    <Navbar bg='primary' expand='lg' variant='dark'>
      <Container>
        <Navbar.Brand>
          <Link to='/'>NotoSphere</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Form inline='true'>
              <FormControl
                type='text'
                placeholder='Search'
                className='mr-sm-2'
              />
            </Form>
          </Nav>
          <Nav>
            <Nav.Link>
              <Link to='/mynotes'>MyNotes</Link>
            </Nav.Link>
            <NavDropdown title='Ashwin' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>My Profile</NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  localStorage.removeItem("userInfo");
                  history("/");
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
