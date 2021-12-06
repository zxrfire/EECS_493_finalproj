import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import '../style/DayCard.css'
import '../style/MapContainer.css'
import TimePickerComponent from './TimePicker';
import {Accordion, Button, useAccordionButton} from 'react-bootstrap';

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('totally custom!'),
  );

  return (
      <button
          type="button"
          style={{ backgroundColor: 'pink' }}
          onClick={decoratedOnClick}
      >
        {children}
      </button>
  );
}


const ItineraryPlaceCard = props => {

  const {dayID, place, placeIndex, setAttractionTime, deletePlace, isMuted} = props;

  return (
      <Accordion.Item eventKey={`day${dayID}place${placeIndex}`}>
        {/*<Accordion.Header>*/}
          <div className={"card shadow-sm p-2 mb-2 bg-body rounded"} style={{"marginLeft": "-0.75%", "marginRight": "-0.75%"}}>
            <div className={"d-flex justify-content-between align-items-center "}>
              <div className={"col-xs-2 align-middle"}>
                <TimePickerComponent
                    setAttractionTime={setAttractionTime}
                    displayTime={place.plannedTime}
                    dayID={dayID}
                    placeIndex={placeIndex}
                    newSortOrder={props.newSortOrder}
                />
              </div>
              <div className={"col-xs-7 align-middle"}>
                <div className={"px-3 text-center"}>
                  <span className={isMuted ? "text-muted" : ""}>{place.address}</span>
                </div>
              </div>
              <div className={"col-xs-2 align-middle"}>

                <Button variant={`${isMuted? "secondary" : "danger"} btn-sm`}
                        onClick={() => deletePlace(dayID, placeIndex)}>
                  <span className="oi oi-delete"></span>
                </Button>
              </div>
            </div>
          </div>

        {/*</Accordion.Header>*/}
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Accordion.Body>
      </Accordion.Item>
  );
};

// MyComponent.propTypes = {
//
// };

export default ItineraryPlaceCard;
