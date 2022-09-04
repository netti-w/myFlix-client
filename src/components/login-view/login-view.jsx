import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Container, CardGroup, Card, Form, Row, Col, Button } from 'react-bootstrap';
// import { Button } from '../button/button';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col lg={5} md={5} sm={9}>
          <CardGroup>
            <Card style={{ marginTop: 100, marginBottom: 50 }}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>Welcome back. Log in here.</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="Enter a username" />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter a password" />
                  </Form.Group>
                  <Button style={{ marginTop: 20, marginRight: 20 }} variant="primary" className="button-primary px-5" type="submit" onClick={handleSubmit}>
                    Log in
                  </Button>
                  <Button style={{ marginTop: 20 }} variant="outline-primary" className="button-secondary px-4" type="submit" onClick={handleSubmit}>
                    Sign up
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};