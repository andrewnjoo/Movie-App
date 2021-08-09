import React from "react";
// import { Link } from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { toast } from "react-toastify";

const Mynavbar = ({ setAuth }) => {
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully.");
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href={"/"}>iLoveMovies</Navbar.Brand>
          <Nav>
            <NavDropdown
              className="ml-auto"
              title="Login"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href={"/login"}>Login</NavDropdown.Item>
              <NavDropdown.Item href={"/register"}>Get Started</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Mynavbar;
