import React from "react";
// import { Link } from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { toast } from "react-toastify";

function UserNav ({logout}){
  return (
    <>
    <Nav className='me-auto'>
      <Nav.Link href={'/popular'}>Popular</Nav.Link>
    </Nav>
    <Nav>
      <NavDropdown className="ml-auto" title="Menu" id="basic-nav-dropdown">
        <NavDropdown.Item href={"/dashboard"}>My Movies</NavDropdown.Item>
        <NavDropdown.Item href={"/profile"}>My Profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={
          (e)=>{
            logout(e)
          }
          }>Logout</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    </>
  )
}

function GuestNav (props){
  return (
    <Nav>
      <NavDropdown className="ml-auto" title="Login" id="basic-nav-dropdown">
        <NavDropdown.Item href={"/login"}>Login</NavDropdown.Item>
        <NavDropdown.Item href={"/register"}>Get Started</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
}

export const LoggedNav = ({isAuth, logout}) => {
  // console.log('loggednav isauth', isAuth)
  if(isAuth){
    return <UserNav logout={logout}/>
  } else {
    return <GuestNav/>
  }
};

const MyNavBar = ({ setAuth, isAuth }) => {
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
          <Navbar.Brand href={"/"}>movieApp</Navbar.Brand>
          <LoggedNav isAuth={isAuth} logout={logout}/>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavBar;