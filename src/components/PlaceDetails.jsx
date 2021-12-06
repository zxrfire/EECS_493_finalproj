import React, {Fragment, useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';
import Rating from 'react-rating';

const PlaceDetails = props => {

  const { place, morePlaceInfo } = props;

  const renderImage = () => {
    return (place['imageURL'] && place.imageURL !== "" &&
        <Row className={"mb-2"}>
          <img src={place.imageURL} alt={place.address} />
        </Row>);
  };


  useEffect(() => {
    return () => {
      morePlaceInfo();
    };
  }, [morePlaceInfo]);


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
    return (place.formatted_address && <Row className={"mt-1"}>
      <Col xs={1} className={"d-flex align-items-center justify-content-center"}>
        <span className="oi oi-location"></span>
      </Col>
      <Col xs={11}><h6>{place.formatted_address}</h6></Col>
    </Row>);
  };

  const renderPhone = () => {
    return (place.international_phone_number && <Row className={"mt-1"}>
      <Col xs={1} className={"d-flex align-items-center justify-content-center"}>
        <span className="oi oi-phone"></span>
      </Col>
      <Col xs={11} className={"d-flex align-items-center"}><h6>{place.international_phone_number}</h6></Col>
    </Row>);
  };

  const renderOpenHours = () => {
    if (place['opening_hours'] && place['opening_hours']['weekday_text']){
      return (
          <Fragment>
            <Row className={"mt-1"}>
              <Col xs={1} className={"mt-1  d-flex align-items-start   justify-content-center"}>
                <span className="oi oi-clock"></span>
              </Col>
              <Col xs={11} >
              {place.opening_hours.weekday_text.map(
                  hours => (<Row>
                    <h6>{hours}</h6>
                  </Row>)
              )}</Col>
            </Row>

          </Fragment>
      );
    }
  };

  const renderWebsite = () => {
    if (place['website']){
      return (
      <Row className={"mt-1"}>
        <Col xs={1} className={"mt-3  d-flex align-items-start   justify-content-center"}>
          <span className="oi oi-external-link"></span>
        </Col>
        <Col xs={11}>
          <a href={place['website']}
             target={"_blank"}
             rel="noopener noreferrer"
                  className={"btn btn-outline-secondary"}>
            Visit the Attraction's Website
          </a>
        </Col>
      </Row>);
    }
  };

  return (
      <Fragment>
        {renderImage()}
        {renderRatings()}
        {renderAddress()}
        {renderOpenHours()}
        {renderPhone()}
        {renderWebsite()}
      </Fragment>
  );
};

export default PlaceDetails;