import React from 'react';
import axios from 'axios';
import { setMovies, setUser } from '../../actions/actions';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";


import MoviesList from '../movies-list/movies-list';

import { NavBar } from '../navbar/navbar';
import LoginView from '../login-view/login-view';
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from "../profile-view/profile-view";


import { Container, Row, Col, Button } from 'react-bootstrap';

class MainView extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let username = localStorage.getItem('username');

    const { movies, user } = this.props;

    if (accessToken && !movies.length) {
      this.getMovies(accessToken);
    }

    if (accessToken && !user) {
      this.getUser(accessToken, username)
    }
  }

  getMovies(token) {
    axios.get('https://vercel-test-virid-two.vercel.app/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser(token, username) {
    axios.get(`https://vercel-test-virid-two.vercel.app/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      console.log("profile response: ", response)
      this.props.setUser({ user: response.data });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    this.props.setUser({
      user: authData.user
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('username', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({
      user: null
    });
    window.open("/", "_self");
  }

  isAuthed() {
    let accessToken = localStorage.getItem('token');
    let username = localStorage.getItem('username');

    console.log("is authed: ", username, accessToken)

    if (accessToken !== null && username !== null) return true;

    return false;
  }

  render() {
    let { movies, user } = this.props;

    let isAuthed = this.isAuthed();

    return (
      <Router>
        <NavBar user={user} />
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!isAuthed)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies} />
            }}
          />

          <Route
            path="/register"
            render={() => {
              if (isAuthed) return <Redirect to="/" />;
              return (
                <Col lg={8} md={8}>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          <Route
            path={`/users/:username`}
            render={({ history }) => {
              if (!user.Username) return <Redirect to="/" />;
              return (
                <Col>
                  <ProfileView
                    user={user}
                    onBackClick={() => history.goBack()}
                    movies={movies}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!isAuthed)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!isAuthed)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8} >
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!isAuthed)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

        </Row >
      </Router >
    );
  }

}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
