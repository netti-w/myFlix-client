// import React from 'react';

// import { Container, Button, Row, Col } from 'react-bootstrap';

// import { Link } from "react-router-dom";

// export class DirectorView extends React.Component {
//     render() {
//         const { movie, onBackClick } = this.props;

//         return (
//             <Container>
//                 <Row className="movie-view" style={{ marginTop: 20, marginBottom: 20 }}>
//                     <Col md={9} sm={6}>
//                         <div className="director-name bg-dark-text" >
//                             <h3 className="value"><span className="value">{movie.Director.Name}</span></h3>
//                         </div>
//                         <div className="director-birth bg-dark-text">
//                             <span className="value">Born in {movie.Director.Birth}</span>
//                         </div>
//                         <div className="director bg-dark-text">
//                             <span className="label">Biography: </span>
//                             <span className="value">{movie.Director.Bio}</span>
//                         </div>
//                         <Button onClick={() => { onBackClick(null); }} variant="primary" style={{ marginTop: 15 }} className="button-primary px-4">Back</Button>
//                     </Col>
//                 </Row>
//             </Container>
//         );
//     }
// }

import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

// Import React Bootstrap Components
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick, movies, movie } = this.props;

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
            {/* if(director.Death) {
                                <div className="director-birth bg-dark-text">
                                    <span className="label">Died: </span>
                                    <span className="value">{director.Death}</span>
                                </div>
                            }; */}
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