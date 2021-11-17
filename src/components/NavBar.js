import React from "react";
// import { Link } from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { toast } from "react-toastify";
const logo = require( '../assets/logo.png')

function UserNav ({logout}){
  return (
    <>
    <Nav className='me-auto'>
      <Nav.Link href={'/popular'}>Popular</Nav.Link>
      <Nav.Link href={'/dashboard'}>Movie List</Nav.Link>
      {/* <Nav.Link href={'/moviesivewatched'}>Movies watched</Nav.Link> */}
    </Nav>
    <Nav
  
    >
      <NavDropdown 
      align="end"
      flip
      title="Menu" 
      id="basic-nav-dropdown">
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
                <Nav.Link href={"/login"}>Login</Nav.Link>

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

const NavBar = ({ setAuth, isAuth }) => {
  //logout function
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully.");
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark" >
        <Container>
          <Navbar.Brand href={"/"}>
          <img
          alt=""
          src={logo.default}
          width="30"
          height="30"
          className="d-inline-block align-top rounded-circle"
        />{' '}
            movieApp
            </Navbar.Brand>
          <LoggedNav isAuth={isAuth} logout={logout}/>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;