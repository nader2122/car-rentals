import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const logout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div>
      <Navbar bg="dark" expand="md" fixed="top">
        <Container>
          <Navbar.Brand>
            <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
              <i className="fas fa-car pr-1"></i> SCHNEIDER CAR RENTALS
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {user ? (
                <>
                  <NavDropdown
                    title={user.firstName}
                    id="collasible-nav-dropdown"
                    style={{ fontSize: '20px', fontWeight: 'bold' }}
                  >
                    <NavDropdown.Item>
                      <Link
                        to="profil"
                        style={{ textDecoration: 'none', color: 'black' }}
                      >
                        <i class="fas fa-address-card p-1"> Profil</i>
                      </Link>
                    </NavDropdown.Item>
                    {user.isAdmin && (
                      <div>
                        <NavDropdown.Item>
                          <Link
                            to="/userstable"
                            style={{ textDecoration: 'none', color: 'black' }}
                          >
                            <i class="fas fa-user-shield p-1"> Users Table</i>
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link
                            to="/carstable"
                            style={{ textDecoration: 'none', color: 'black' }}
                          >
                            <i class="fas fa-user-shield p-1"> Cars Table</i>
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link
                            to="/bookedtable"
                            style={{ textDecoration: 'none', color: 'black' }}
                          >
                            <i class="fas fa-user-shield p-1"> Book Table</i>
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link
                            to="/addcars"
                            style={{ textDecoration: 'none', color: 'black' }}
                          >
                            <i class="fas fa-user-shield p-1"> Add Cars</i>
                          </Link>
                        </NavDropdown.Item>
                      </div>
                    )}

                    <NavDropdown.Item onClick={logout}>
                      <i class="fas fa-sign-out-alt p-1">Logout</i>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <div>
                  <Link
                    to="/register"
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                      paddingRight: '20px',
                    }}
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                      paddingLeft: '20px',
                    }}
                  >
                    Login
                  </Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
