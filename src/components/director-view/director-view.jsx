import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

// Import React Bootstrap Components
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container>
        <Row className="director-view" style={{ marginTop: 20, marginBottom: 20 }}>
          <Col md={9} sm={6}>
            <div className="director-title bg-dark-text" >
              <h3 className="label"><span className="value">{director.Name}</span></h3>
            </div>
            <div className="director-birth bg-dark-text">
              <span className="label">Born: </span>
              <span className="value">{director.Birth}</span>
            </div>
            {director.Death ? (<div className="director-death bg-dark-text">
              <span className="label">Died: </span>
              <span className="value">{director.Death}</span>
            </div>) : (<div />)}
            <div className="director-bio bg-dark-text">
              <span className="label">Biography: </span>
              <span className="value">{director.Bio}</span>
            </div>
            <Button onClick={() => { onBackClick(null); }} variant="primary" style={{ marginTop: 15 }} className="button-primary px-4">Back</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

DirectorView.proptypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string,
    Birth: PropTypes.number,
  }).isRequired,
};