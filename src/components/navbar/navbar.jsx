
import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./navbar.scss";

export function NavBar() {
  let user = localStorage.getItem("user");
  console.log(user)

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.open("/", "_self");
    props.onLoggedOut(user);
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar variant="dark" className="navbar-expand-lg">
      <Container fluid style={{ marginTop: 15, marginBottom: 10 }}>
        <Navbar.Brand href="/">myFlix</Navbar.Brand>
        {isAuth() && (<Navbar.Text className="ml-auto mr-5">
          Signed in as: <Link className="link-secondary" as={Link} to={`/users/${user}`}>{user}</Link>
        </Navbar.Text>)}
        <Nav className="me-auto">
          {/* <Nav.Link href="#home">Home</Nav.Link> */}
          {isAuth() && (<Nav.Link className="link-secondary" href="/">Movies</Nav.Link>)}
          {isAuth() && (<Nav.Link className="link-secondary" as={Link} to={`/users/${user}`}>Profile</Nav.Link>)}
          {isAuth() && (<Nav.Link className="logout link-secondary" onClick={handleLogOut}>Logout</Nav.Link>)}
          {!isAuth() && <Nav.Link className="link-secondary" href="/">Log in</Nav.Link>}
          {!isAuth() && <Nav.Link className="link-secondary" href="/register">Sign up</Nav.Link>}
        </Nav>
      </Container>
    </Navbar >
  );
}