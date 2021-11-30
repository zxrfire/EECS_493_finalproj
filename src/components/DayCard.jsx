import React, {useState} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {useDrop} from 'react-dnd';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import '../style/DayCard.css';
import '../style/MapContainer.css';
import MapSuggestionBox from './MapSuggestionBox';
import ItineraryPlaceCard from './ItineraryPlaceCard';

const DayCard = (props) => {
  // const visibility = React.useContext(VisibilityContext);
  const { day, dayID, newPlace, deletePlace, clearPlaces, toggleMarkers, setAttractionTime,
    newDropRecommendation, usedDragDrop, setUsedDragDrop } = props;

  const [address, setAddress] = useState("");

  const [{isOver}, drop] = useDrop(() => ({
    accept: "Recommendation",
    drop: async (item) => handleDropRecommendation(item.attractionId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));


  const handleDropRecommendation = async (recommendationIdx) => {
    if (!usedDragDrop){
      setUsedDragDrop();
    }
    await newDropRecommendation(dayID, recommendationIdx);
  };

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
    setAddress(""); // clear the value?
  };

  const renderList = () => {
    // console.log("Rendering day's places");
    // console.log(day.places);
    return day.places.map((place, placeIndex) => (
        <ItineraryPlaceCard
            dayID={dayID}
            place={place}
            placeIndex={placeIndex}
            setAttractionTime={setAttractionTime}
            newSortOrder={props.newSortOrder}
            deletePlace={deletePlace}
        ></ItineraryPlaceCard>
    ));
  };

  return (
       <div className={"card day_card shadow-sm p-1 mb-2 bg-white rounded"}
             // style={{"margin-left": "4%", "margin-right": "4%"}}
       >
         <div className={"card-body"}
              style={{'minHeight': '150px'}} ref={drop}>
           <Row className={"mb-2"}>
             <Col xs={12} md={10}>
               <h5 className="card-title">{getCardTitle()}</h5>
             <h6 className={"card-subtitle mb-2 text-muted"}>{getCardSubtitle()}</h6>
             </Col>
             <Col xs={6} md={2} >
               <div className={"form-check  form-switch form-switch-lg"}>
                 <input className={"form-check-input"} type="checkbox" value=""
                        id={`Check${dayID}`} checked={day.displayMarkers}
                        onChange={() => toggleMarkers(dayID)}/>

               </div>
               <Button variant="danger" size="sm" onClick={() => clearPlaces(dayID)}>
                 <span className={"oi oi-trash"}></span>
               </Button>
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
