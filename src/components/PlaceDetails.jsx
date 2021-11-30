import React, {Fragment} from 'react';
import {Col, Row} from 'react-bootstrap';
import Rating from 'react-rating';

const PlaceDetails = props => {

  const { place } = props;

  const renderImage = () => {
    return (place.imageURL !== "" &&
        <Row className={"mb-2"}>
          <img src={place.imageURL} alt={place.address} />
        </Row>);
  };

  const renderRatings = () => {
    let ratings;
    if (place.rating){
      ratings =
          <Fragment>
            <Col xs={7} className={"d-flex align-items-center justify-content-start"}>
              <Rating
                  fractions={10}
                  initialRating={place.rating}
                  readonly
              /> </Col>
            <Col xs={3} className={"ms-auto"}>
              <span  className={"align-middle"}>{place.rating}/5</span>
            </Col>
          </Fragment>;
    } else {
      ratings = <Col xs={11}>Ratings Not Available</Col>;
    }
    return (
        <Row className={"mt-1 align-content-center"}>
          <Col xs={1} className={"d-flex align-items-center justify-content-center"}>
            <span className="oi oi-star"></span>
          </Col>
          {ratings}
        </Row>
    );
  };

  const renderAddress = () => {
    return (<Row className={"mt-1"}>
      <Col xs={1} className={"d-flex align-items-center justify-content-center"}><span className="align-middle oi oi-home"></span></Col>
      <Col xs={11}><h6>{place.formatted_address}</h6></Col>
    </Row>);
  };

  return (
      <Fragment>
        {renderImage()}
        {renderRatings()}
        {renderAddress()}
      </Fragment>
  );
};

export default PlaceDetails;