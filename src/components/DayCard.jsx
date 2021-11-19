import React from 'react';
import {VisibilityContext} from 'react-horizontal-scrolling-menu';
import {Card, ListGroup, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';


const DayCard = (props) => {
  const visibility = React.useContext(VisibilityContext);
  const { day } = props;

  const getCardTitle = ()=>{
    // format in english form
    return day.date.format('LL');
  };

  return (
      // <Card.Title
      //     // onClick={() => onClick(visibility)}
      //     style={{
      //       width: "160px",
      //     }}
      //     tabIndex={0}
      // >
     <React.Fragment>
       <Card style={{ width: '18rem' }}>
         <Card.Body>
           <Card.Title>{getCardTitle()}</Card.Title>
           <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
           <Card.Text>
             Some quick example text to build on the card title and make up the bulk of
             the card's content.
           </Card.Text>
          <Button variant="primary">Go somewhere</Button>
         </Card.Body>
         <ListGroup variant="flush">
           <ListGroup.Item>Cras justo odio</ListGroup.Item>
           <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
           <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
         </ListGroup>
       </Card>
     </React.Fragment>
        // <div
        //     style={{
        //       height: "200px",
        //     }}
        // />
      // </div>
  );
};

export default DayCard;