import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Container, Button, CardGroup, Card } from 'react-bootstrap';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card style={{ marginTop: 10 }} className="mb-3 mx-1">
        <Card.Img variant="top" class="movie-cardstyle" src={movie.ImagePath} crossOrigin="Anonymous" />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Subtitle>{movie.Genre.Name}</Card.Subtitle>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="primary" className="button-primary px-4" style={{ marginTop: 10 }}>View</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired,
  }).isRequired
};
