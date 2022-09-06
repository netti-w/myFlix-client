import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Button, Form, Row, Col, CardGroup, Card, Alert } from 'react-bootstrap';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [values, setValues] = useState({
    username: "",
    passwordErr: "",
    emailErr: "",
  });

  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: "Username is required." });
      isReq = false;
    } else if (username.length < 4) {
      setValues({
        ...values,
        usernameErr: "Your username must be at least 4 characters long.",
      });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: "Password is required." });
      isReq = false;
    } else if (password.length < 6) {
      setValues({
        ...values,
        passwordErr: "Your password must be atleast 6 characters long",
      });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: "Email is required" });
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setValues({ ...values, emailErr: "This email is invalid" });
      isReq = false;
    }
    return isReq;
  };

  // Modify state of MainView to be registered and logged in with new user
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post('https://myflix-nw.herokuapp.com/login', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Registration successful, please login!");
          window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch((response) => {
          console.error(response);
          alert("unable to register");
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col lg={5} md={6} sm={9}>
          <CardGroup>
            <Card style={{ marginTop: 20, marginBottom: 50 }}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>Welcome to myFlix</Card.Title>
                <Card.Subtitle className="pb-4" style={{ textAlign: 'center' }}>Please enter your details to sign up</Card.Subtitle>
                <Form>
                  <Form.Group className="mb-3" controlId="formRegUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter a username (min. 4 characters)" />
                    {values.usernameErr && <p>{values.usernameErr}</p>}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formRegPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter a password" />
                    {values.passwordErr && <p>{values.passwordErr}</p>}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formRegEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email adress" />
                    {values.emailErr && <p>{values.emailErr}</p>}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formRegBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Enter your birthday" />
                    {values.birthdayErr && <p>{values.birthdayErr}</p>}
                  </Form.Group>
                  <Button variant="primary" className="button-primary mt-2 mb-3 px-5" style={{ textAlign: 'center' }} type="submit" onClick={handleSubmit}>Sign up</Button>
                  <p className="mb-0">Do you already have an account? <Alert.Link href="#" className="link-primary" >Log in here</Alert.Link>.</p>
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

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.date
  }),
  onRegistered: PropTypes.func.isRequired,
};