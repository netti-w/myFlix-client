import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { UserInfo } from "../user-info/user-info";

import { Container, Button, Row, Col, Card, Form, CardGroup, Figure } from 'react-bootstrap';

import { Link } from "react-router-dom";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavouriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser = (token) => {
    const Username = localStorage.getItem("user");
    axios.get(`https://myflix-nw.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavouriteMovies: response.data.FavouriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios.put(`https://myflix-nw.herokuapp.com/users/${Username}`,
      {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });

        localStorage.setItem("user", this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert("Profile is updated!");
        window.open(`/users/${Username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onDeleteUser() {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.delete(`https://myflix-nw.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        alert("Profile has been deleted!");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open(`/`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  onRemoveFavourite = (e, movie) => {
    const username = localStorage.getItem("user");
    console.log(username);
    const token = localStorage.getItem("token");
    console.log(this.props);
    axios.delete(`https://myflix-nw.herokuapp.com/users/${Username}/movies/${movie._id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert("Movie was removed from favourites.");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }






  // Set user values
  setUsername(value) {
    this.setState({
      Username: value,
    });
    this.Username = value;
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
    this.Password = value;
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
    this.Email = value;
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
    this.Birthday = value;
  }

  render() {
    const { movie } = this.props;
    const { FavouriteMovies, Username, Email, Birthday, Password } = this.state;

    return (
      <Container>
        <Row className="user-profile" style={{ marginTop: 20, marginBottom: 20 }}>
          <h3 className="bg-dark-text">{Username}'s profile</h3>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>Your Profile Details</Card.Title>
                <p>Email: {Email}</p>
                <p>Birthday: {Birthday}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title style={{ textAlign: 'center' }}>Update Profile Details</Card.Title>
                  <Card.Text className="pb-6" style={{ textAlign: 'center' }}>*Please fill out all the required fields.</Card.Text>
                  <Form>
                    <Form.Group className="mb-3" controlId="formUsername">
                      <Form.Label>*Username:</Form.Label>
                      <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder="Enter a name (min. 4 characters)" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>*Password:</Form.Label>
                      <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>*Email:</Form.Label>
                      <Form.Control type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter your email adress" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBirthday">
                      <Form.Label>Birthday:</Form.Label>
                      <Form.Control type="date" onChange={e => setBirthday(e.target.value)} placeholder="Enter your birthday" />
                    </Form.Group>
                    <Button variant="primary" className="button-primary mt-2 mb-3 px-5" style={{ textAlign: 'center' }} type="submit" onClick={() => this.editUser()}>Update Profile</Button>
                    <p></p>
                    <p className="mb-0 small">Do you want to delete your account? We will delete all your user data.</p>
                    <Button className="button-secondary mt-2 mb-3 px-5" variant="secondary" onClick={() => this.onDeleteUser()}>Delete Account</Button>
                  </Form>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        <Row></Row>
        <Card >
          <Card.Body>
            <Row>
              <Col>
                <h4>Your Favourite Movies</h4>
              </Col>
            </Row>
            <Row>
              <Card>
              </Card>
              {FavouriteMovies.map((movie) => {
                return (
                  <Col key={movie._id}>
                    <Figure>
                      <Link to={`/movies/${movie._id}`}>
                        <Figure.Image src={movie.ImagePath} />
                        <Figure.Caption>{movie.Title}</Figure.Caption>
                      </Link>
                    </Figure>
                    <Button className="button-secondary" variant="secondary" onClick={() => removeFav(FavouriteMovies._id)}>Remove</Button>
                  </Col>
                );
              })}
            </Row>

          </Card.Body>
        </Card>
      </Container>
    );
  }
}
