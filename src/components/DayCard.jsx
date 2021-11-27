import React, {Fragment, useState} from 'react';
import {VisibilityContext} from 'react-horizontal-scrolling-menu';
import {Card, ListGroup, Button, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/DayCard.css'
import '../style/MapContainer.css'
import MapSuggestionBox from './MapSuggestionBox';
import moment from 'moment';


const DayCard = (props) => {
  // const visibility = React.useContext(VisibilityContext);
  const { day, id, newPlace, deletePlace, clearPlaces, getMarkersLatLng } = props;

  const [address, setAddress] = useState("");

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

  // // deleting an certain attraction in the day
  // const handleDelete = (address) => {
  //
  // };
  //
  // // handle clearing all items
  // const handleClear = () => {
  //
  // };

  const renderList = () => {
    console.log("Rendering day's places");
    console.log(day.places);
    const places_names =  Array.from(day.places.keys())
      .map((name) => (
          <ListGroup.Item key={`Attraction ${name}`}>
            <Row>
              <Col xs={12} md={11}>
                {name}
              </Col>
              <Col xs={4} md={1}>
                <Button variant="danger btn-sm"
                        onClick={() => deletePlace(id, name)}>
                  -
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>));
    return (
        <ListGroup variant="flush">
          {places_names}
        </ListGroup>
    );
  };

  return (
      // <React.Fragment>
      //   <div className="card" style="width: 18rem;">
      //     <div className="card-body">
      //       <h5 className="card-title">Card title</h5>
      //       <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
      //       <p className="card-text">Some quick example text to build on the
      //         card title and make up the bulk of the card's content.</p>
      //       <a href="#" className="card-link">Card link</a>
      //       <a href="#" className="card-link">Another link</a>
      //     </div>
      //   </div>
       <div className={"card day_card shadow p-3 mb-5 bg-white rounded"}
             // style={{"margin-left": "4%", "margin-right": "4%"}}
       >
         <div className={"card-body"}
              style={{'minHeight': '450px', 'max-height': '500px'}}>
           <h5 className="card-title">{getCardTitle()}</h5>
           <h6 className={"card-subtitle mb-2 text-muted"}>{getCardSubtitle()}</h6>
           {renderList()}
           <MapSuggestionBox
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}/>
          <Button variant="danger" onClick={() => clearPlaces(id)}>Clear</Button>
           <Button variant="secondary" onClick={() => getMarkersLatLng(id)}>Show Attractions on this day</Button>
         </div>
       </div>
      // </React.Fragment>
  );
};

export default DayCard;
