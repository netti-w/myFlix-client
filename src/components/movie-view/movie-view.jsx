import React from 'react';
import axios from 'axios';

import { Container, Button, Row, Col, Image, Link } from 'react-bootstrap';

import { Link } from "react-router-dom";

import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    const handleAddFavourite = (movieId) => {
      const Username = localStorage.getItem("user");
      const accessToken = localStorage.getItem("token");
      console.log(Username);
      console.log(accessToken);
      console.log(movieId);
      axios.put(`https://myflix-nw.herokuapp.com/users/${Username}/movies/${movieId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((response) => {
          console.log(response);
          alert("Movie was added to favourites.");
          this.componentDidMount();
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return (
      <Container>
        <Row className="movie-view" style={{ marginTop: 20, marginBottom: 20 }}>
          <Col md={3} sm={6}>
            <div className="movie-poster">
              <Image fluid rounded src={movie.ImagePath} crossOrigin="Anonymous" style={{ marginBottom: 20 }} alt="Movie poster of {movie.Title}" />
            </div>
          </Col>
          <Col md={9} sm={6}>
            <div className="movie-title bg-dark-text" >
              <h3 className="label"><span className="value">{movie.Title}</span></h3>
            </div>
            <div className="movie-year bg-dark-text">
              <span className="label">Released: </span>
              <span className="value">{movie.ReleaseYear}</span>
            </div>
            <div className="movie-genre bg-dark-text">
              <span className="label">Genre: </span>
              <span className="value"><Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link></span>
            </div>
            <div className="movie-director bg-dark-text">
              <span className="label">Director: </span>
              <span className="value"><Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link></span>
            </div>
            <div className="movie-description bg-dark-text" style={{ marginTop: 20 }}>
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
            <Button onClick={() => handleAddFavourite(movie._id)} variant="primary" style={{ marginTop: 15, marginRight: 15 }} className="button-primary px-4">Add to favourites</Button>
            <Button onClick={() => { onBackClick(null); }} variant="secondary" style={{ marginTop: 15 }} className="button-secondary px-4">Back</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}