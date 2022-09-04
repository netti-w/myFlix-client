import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';

import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {

  render() {
    return (
      <Container fluid>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#">myFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                {/* <Nav.Link href="#" disabled>
                  Link
                </Nav.Link> */}
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search movie"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" style={{ marginLeft: 10 }} className="button-secondary">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <MainView />
      </Container>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);