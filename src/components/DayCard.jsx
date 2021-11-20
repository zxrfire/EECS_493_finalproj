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
       <div className={"card day_card shadow p-3 mb-5 bg-white rounded"}
             // style={{"margin-left": "4%", "margin-right": "4%"}}
       >
         <div className={"card-body"}>
           <div className={"card-title"}>{getCardTitle()}</div>
           <div className={"card-subtitle mb-2 text-muted"}>{getCardSubtitle()}</div>
           {renderList()}
           <MapSuggestionBox
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}/>
          <Button variant="primary">Go somewhere</Button>
         </div>
       </div>
  );
};

export default DayCard;