import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import '../style/DayCard.css'
import '../style/MapContainer.css'
import TimePickerComponent from './TimePicker';
import {Button} from 'react-bootstrap';

const ItineraryPlace = props => {

  const {dayID, place, placeIndex, setAttractionTime, deletePlace} = props;

  return (
      <div className={"card shadow-sm p-3 mb-1 bg-body rounded no-gutters"}
           style={{"padding": "0!important"}}>
        <div className={"d-flex justify-content-between align-items-center "}>
          <div className={"col-xs-2 align-middle"}>
            <TimePickerComponent
                setAttractionTime={setAttractionTime}
                displayTime={place.plannedTime}
                dayID={dayID}
                placeIndex={placeIndex}
            />
          </div>
          <div className={"col-xs-7 align-middle"}>
            <div className={"px-3 text-center"}>
              {place.address}
            </div>
          </div>
          <div className={"col-xs-2 align-middle"}>

            <Button variant="danger btn-sm"
                    onClick={() => deletePlace(dayID, placeIndex)}>
              <span className="oi oi-delete"></span>
            </Button>
          </div>
        </div>
      </div>
  );
};

// MyComponent.propTypes = {
//
// };

export default ItineraryPlace;
