import React, {Fragment, useState} from 'react';
import {VisibilityContext} from 'react-horizontal-scrolling-menu';
import {Card, ListGroup, Button, Row, Col, InputGroup, FormControl, Stack} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/DayCard.css'
import '../style/MapContainer.css'
import MapSuggestionBox from './MapSuggestionBox';
import TimePickerComponent from './timepicker';


const DayCard = (props) => {
  // const visibility = React.useContext(VisibilityContext);
  const { day, dayID, newPlace, deletePlace, clearPlaces, toggleMarkers, setAttractionTime } = props;

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
    await newPlace(dayID, address);
  };

  const renderList = () => {
    console.log("Rendering day's places");
    console.log(day.places);
    const places_names =  day.places
      .map((place, placeIndex) => (
        <div className={"card shadow-sm p-3 mb-1 bg-body rounded"}>
          <div className={"d-flex justify-content-between align-items-center"}>
        {/*<Stack direction="horizontal" gap={3}>*/}
              <div className={"col-xs-2 align-middle"}>
          {/*<div style={{"width": "40%"}}>*/}
                  <TimePickerComponent
                    setAttractionTime={setAttractionTime}
                    dayID={dayID}
                    placeIndex={placeIndex}
                  />
          {/*</div>*/}
              </div>
              <div className={"col-xs-7 align-middle"}>
                <div className={"px-3"}>
                   {place.address}
                </div>
              </div>
              <div className={"col-xs-2 align-middle"}>
              {/*  <div className={"float-end"}>*/}

                <Button variant="danger btn-sm"
                        onClick={() => deletePlace(dayID, placeIndex)}>
                  <span aria-hidden="true">-</span>
                </Button>
                {/*</div>*/}
              </div>
            {/*</Stack>*/}
          </div>
        </div>
    ));
    return places_names;
        // <ListGroup variant="flush">
        // </ListGroup>
  };

  return (
       <div className={"card day_card shadow p-3 mb-5 bg-white rounded"}
             // style={{"margin-left": "4%", "margin-right": "4%"}}
       >
         <div className={"card-body"}
              style={{'minHeight': '450px', 'max-height': '500px'}}>
           <Row>
             <Col xs={12} md={10}>
               <h5 className="card-title">{getCardTitle()}</h5>
             <h6 className={"card-subtitle mb-2 text-muted"}>{getCardSubtitle()}</h6>
             </Col>
             <Col xs={6} md={2}>
               <div className={"form-check  form-switch form-switch-lg"}>
                 <input className={"form-check-input"} type="checkbox" value=""
                        id={`Check${dayID}`} checked={day.displayMarkers}
                        onChange={() => toggleMarkers(dayID)}/>

               </div>
               <Button variant="danger" size="sm" onClick={() => clearPlaces(dayID)}>Clear</Button>
             </Col>
           </Row>


           {renderList()}
           <MapSuggestionBox
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}/>

           {/*<Button variant="secondary" onClick={() => showMarkersByDay(dayID)}>Show Attractions on this day</Button>*/}
         </div>
       </div>
      // </React.Fragment>
  );
};

export default DayCard;
