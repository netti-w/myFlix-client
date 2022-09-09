import React from "react";
import PropTypes from "prop-types";

// Import React Bootstrap Components
import { Container, Button, Row, Col } from 'react-bootstrap';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (

      <Container>
        <Row className="genre-view" style={{ marginTop: 20, marginBottom: 20 }}>
          <Col md={9} sm={6}>
            <div className="genre-title bg-dark-text" >
              <h3 className="label"><span className="value">{genre.Name}</span></h3>
            </div>
            <div className="genre-description bg-dark-text">
              <span className="label">Description: </span>
              <span className="value">{genre.Description}</span>
            </div>
            <Button onClick={() => { onBackClick(null); }} variant="primary" style={{ marginTop: 15 }} className="button-primary px-4">Back</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

GenreView.proptypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};