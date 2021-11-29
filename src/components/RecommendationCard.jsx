import React, {Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDrag} from 'react-dnd';
import {Accordion, Row, Col} from 'react-bootstrap';
import 'open-iconic/font/css/open-iconic-bootstrap.css';

const RecommendationCard = props =>{

  const { attraction, attractionId } = props;

  const [{isDragging}, drag] = useDrag(() => ({
    type: "Place",
    collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
    })
  }));

  return (
      <Fragment>
        <Accordion.Item eventKey={attractionId}>
          <Accordion.Header className={"card shadow bg-body rounded"}
                 ref={drag}>
              <div className={"d-flex justify-content-between align-items-center text-center"}
                   data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                {attraction.name}
              </div>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col xs={3}><span className="oi oi-home"></span></Col>
              <Col xs={9}></Col>
              <h7>{attraction.formatted_address}</h7>
            </Row>
          </Accordion.Body>
        </Accordion.Item>

      </Fragment>

  );
};

export default RecommendationCard;
