import React, {Fragment} from 'react';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDrag} from 'react-dnd';
import {Accordion, Row, Col} from 'react-bootstrap';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import key from '../key';
import Rating from 'react-rating';
import axios from 'axios';

const RecommendationCard = props =>{

  const { attraction, attractionId } = props;


  const [ url, setURL ] = useState("");

  const [{isDragging}, drag] = useDrag(() => ({
    type: "Place",
    collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
    })
  }));


  // const handleCollapse = () => {
  //   if (attraction.photos){
  //     setURL(attraction.photos[0].getUrl());
  //   }
  //   axios.get("https://maps.googleapis.com/maps/api/place/details/json&place_id={attraction.place_id}&key=${key}`
  // };

  const renderImage = () => {
    return (url !== "" &&
        <Row className={"mb-2"}>
          <img src={url} />
        </Row>);
  };

  const renderRatings = () => {
    let ratings;
    if (attraction.rating){
      ratings =
          <Fragment>
            <Col xs={7} className={"d-flex align-items-center justify-content-start"}>
              <Rating
                fractions={10}
                initialRating={attraction.rating}
                readonly
            /> </Col>
            <Col xs={3} className={"ms-auto"}>
              <span  className={"align-middle"}>{attraction.rating}/5</span>
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

  const renderHours = () => {
    return (
    <Row className={"mt-1 align-content-center"}>
      <Col xs={1} className={"d-flex align-items-center justify-content-center"}>
        <span className="oi oi-clock"></span>
      </Col>
      <Col xs={11}>attraction.</Col>
    </Row>);
  };

  return (
      <Fragment>
        <Accordion.Item eventKey={attractionId}>
          <Accordion.Header className={"card shadow bg-body rounded"}
                 ref={drag} onClick={handleCollapse}>
              <div className={"d-flex justify-content-between align-items-center "}
                   data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <span className={"text-center"}>{attraction.name}</span>
              </div>
          </Accordion.Header>
          <Accordion.Body>
            {renderImage()}
            {renderRatings()}
            <Row className={"mt-1"}>
              <Col xs={1} className={"d-flex align-items-center justify-content-center"}><span className="align-middle oi oi-home"></span></Col>
              <Col xs={11}><h7>{attraction.formatted_address}</h7></Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

      </Fragment>

  );
};

export default RecommendationCard;
