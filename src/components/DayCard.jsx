import React, {useState} from 'react';
import {VisibilityContext} from 'react-horizontal-scrolling-menu';
import {Card, ListGroup, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/DayCard.css'
import MapSuggestionBox from './MapSuggestionBox';
import moment from 'moment';


const DayCard = (props) => {
  // const visibility = React.useContext(VisibilityContext);
  const { day, id, newPlace } = props;

  const [address, setAddress] = useState();

  const getCardTitle = ()=>{
    // format in english form
    return day.date.format('LL');
  };

  const getCardSubtitle = () =>{
    return day.date.format('dddd');
  };

  const handleChange = address => {
    setAddress(address);
  };

  const handleSelect = async (address) =>{
    setAddress(address);
    await newPlace(id, address);
  };

  const renderList = () => {
    const places_names = day.places
      .map(name => (<ListGroup.Item>{name}</ListGroup.Item>));
    return (
        <ListGroup variant="flush">
          {places_names}
        </ListGroup>
    );
  };

  return (
     <React.Fragment>
       <Card className="day_card">
         <Card.Body>
           <Card.Title>{getCardTitle()}</Card.Title>
           <Card.Subtitle className="mb-2 text-muted">{getCardSubtitle()}</Card.Subtitle>
           {renderList()}
           <MapSuggestionBox
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}/>
          <Button variant="primary">Go somewhere</Button>
         </Card.Body>
       </Card>
     </React.Fragment>
  );
};

export default DayCard;