import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import './profile-view.scss';

import { Container, Button, Row, Col, Card, Form, CardGroup } from 'react-bootstrap';

export function ProfileView(props) {
  const [user, setUser] = useState(props.user);
  const [movies, setMovies] = useState(props.movies);
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const getUser = () => {
    axios.get(`https://myflix-nw.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
        setFavouriteMovies(response.data.FavouriteMovies)
      })
      .catch(error => console.error(error))
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [values, setValues] = useState({
    username: '',
    passwordErr: '',
    emailErr: '',
  });

  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: "Username is required." });
      isReq = false;
    } else if (username.length < 4) {
      setValues({
        ...values,
        usernameErr: "Your username must be at least 4 characters long."
      });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: "Password is required." });
      isReq = false;
    } else if (password.length < 6) {
      setValues({
        ...values,
        passwordErr: "Your password must be atleast 6 characters long"
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

  const updateUser = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.put(`https://myflix-nw.herokuapp.com/users/${currentUser}`, {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      },
        {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert('Update was successful');
          this.componentDidMount();
          window.open(`/users/${username}`, '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch((response) => {
          console.error(response);
          alert("Unable to update profile");
        });
    }
  };

  const deleteUser = () => {
    axios.delete(`https://myflix-nw.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert(`The account ${user.Username} was successfully deleted.`)
        localStorage.clear();
        window.open('/register', '_self');
      }).
      catch(error => console.error(error))
  }


  const favouriteMoviesId = favouriteMovies.map(movies => movies._id)
  const favouriteMoviesList = favouriteMovies.map(movies => {
    return favouriteMoviesId.includes(movies._id)
  })

  // console.log(movies)
  console.log(favouriteMovies)
  // console.log(favouriteMoviesId)
  console.log(favouriteMoviesList)

  const handleMovieDelete = (movieId) => {
    axios.delete(`https://myflix-nw.herokuapp.com/users/${currentUser}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert(`The movie was successfully deleted.`)
        window.open(`/users/:${currentUser}`, '_self');
      }).
      catch(error => console.error(error))
  }

  useEffect(() => {
    getUser();
  }, [])




  return (
    <Container>
      <Row className="profile-view" style={{ marginTop: 20, marginBottom: 20 }}>
        <Col md={9} sm={6}>
          <div className="genre-title bg-dark-text" >
            <h3 className="label"><span className="value"> Hi {user.Username}, here is your profile overview.</span></h3>
          </div>
        </Col>
      </Row>
      <Row>
        <Col style={{ marginTop: 20, marginBottom: 30 }}>
          <Card>
            <Card.Body>
              <Card.Title style={{ textAlign: 'center' }}>Your Profile Details</Card.Title>
              <p>Profile name: {user.Username}</p>
              <p>Email: {user.Email}</p>
              <p>Birthday: {user.Birthday}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5} md={6} sm={9}>
          <CardGroup>
            <Card style={{ marginTop: 20, marginBottom: 40 }}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>Update your profile</Card.Title>
                <Card.Text className="pb-6" style={{ textAlign: 'center' }}>*Please fill out all the required fields.</Card.Text>
                <Form>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your current username or a new one (min. 4 characters)" />
                    {values.usernameErr && <p>{values.usernameErr}</p>}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your current password or a new one (min. 6 characters)" />
                    {values.passwordErr && <p>{values.passwordErr}</p>}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your current email adress or a new one" />
                    {values.emailErr && <p>{values.emailErr}</p>}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Enter your birthday" />
                    {values.birthdayErr && <p>{values.birthdayErr}</p>}
                  </Form.Group>
                  <Button variant="primary" className="button-primary mt-2 mb-3 px-5" style={{ textAlign: 'center' }} type="submit" onClick={updateUser}>Update profile</Button>
                  <p></p>
                  <p className="mb-0 small">Do you want to delete your account? We will delete all your user data.</p>
                  <Button className="button-secondary mt-2 mb-3 px-5" variant="secondary" onClick={deleteUser}>Delete Account</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
      <Row style={{ marginBottom: 40 }}>
        <Col>
          <Card >
            <Card.Body>
              <Row >
                <Col>
                  <h4>Your Favourite Movies</h4>
                </Col>
              </Row>
              <Row>
                {favouriteMovies.length === 0 ? (
                  <Col className="mb-0">You currently don't have any movies in your list.</Col>
                ) : (
                  favouriteMoviesList.map((movies) => {
                    return (
                      <Col xs={12} md={6} lg={3} key={movies._id} className="fav-movie">
                        <Card>
                          <Link to={`/movies/${movies._id}`}>
                            <Card.Img variant="top" crossOrigin="Anonymous" src={movies.ImagePath} />
                          </Link>
                          <Card.Body>
                            <Card.Title>{movies.Title}</Card.Title>
                            <Button className="button ml-2 button-secondary" variant="outline-primary" size="sm" onClick={() => { handleMovieDelete(movies._id) }} >
                              Remove
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    )
                  }))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}