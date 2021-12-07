import React, {Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/MapContainer.css';
import {useDrag} from 'react-dnd';
import {Accordion, Row, Col} from 'react-bootstrap';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import Rating from 'react-rating';
import PlaceDetails from './PlaceDetails';
import {Place} from '@material-ui/icons';


const RecommendationCard = props =>{

  const { attraction, attractionId, moreRecInfo} = props;

  const [{isDragging}, drag] = useDrag(() => ({
    type: "Recommendation",
    item: {attractionId},
    collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
    })
  }));


  const handleCollapse = async () => {
    await moreRecInfo();
  };


  return (
      <Fragment>
        <Accordion.Item eventKey={attractionId} ref={drag} >
          <Accordion.Header className={"card shadow bg-body rounded"}
              onClick={handleCollapse}>
              <div className={"d-flex justify-content-between align-items-center "}
                   data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <span className={"text-center"}>{attraction.address}</span>
              </div>
          </Accordion.Header>
          <Accordion.Body>
            {/*{renderImage()}*/}
            {/*{renderRatings()}*/}
            {/*<Row className={"mt-1"}>*/}
            {/*  <Col xs={1} className={"d-flex align-items-center justify-content-center"}><span className="align-middle oi oi-home"></span></Col>*/}
            {/*  <Col xs={11}><h6>{attraction.formatted_address}</h6></Col>*/}
            {/*</Row>*/}
            <PlaceDetails place={attraction}></PlaceDetails>
          </Accordion.Body>
        </Accordion.Item>

      </Fragment>

  );
};

export default RecommendationCard;
