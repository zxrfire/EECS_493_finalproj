import React, {Component} from 'react';

import '../style/MapContainer.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import DayCard from './DayCard';
import MyMap from './MyMap';
import DayCards from './DayCards';
import Recommendations from './Recommendations';

import {Container, Row, Col, Button, CardGroup} from 'react-bootstrap';

export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for google map places autocomplete
      // showingInfoWindow: false,
      // activeMarker: {},
      // selectedPlace: {},
      mapCenter: {},
    };
    // this.clearMarks = this.clearMarks.bind(this);
    if (props.cities.length === 0) {
      this.state.mapCenter = {
        lat: 49.2827291,
        lng: -123.1207375,
      };
    } else {
      getLatLng(props.cities[0]).then(this.updateMap);
    }
  }
  getLocationObject = address => geocodeByAddress(address);

  updateMap = (latLng) => {
            console.log('Success', latLng);
            // this.setState({markers: [...this.state.markers, latLng]});
            // update center state
            this.setState({mapCenter: latLng});
          };

  handleNewAttraction = async (id, address) => {
    console.log(address);
    // this.setState({address});
    // this.setState({names: [...this.state.names, address]});
    // this.updateMap(address);
    const newAttractionGeoObj =  (await this.getLocationObject(address))[0];
    const newAttractionLatLng = await getLatLng(newAttractionGeoObj);
    console.log(newAttractionGeoObj);
    await this.updateMap(newAttractionLatLng);
    this.props.newAttraction(id, address, newAttractionGeoObj, newAttractionLatLng);
  };

  render() {
    //let data1 = this.state.names;

    const shadow = {
      "box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    };
    return (
        <>
            <a href='/'><img src="../tripwithmelogo.png"></img></a>
        <div id="my-container">
              {/*// Array of Date cards*/}

            <DayCards
                {...this.props}
                handleNewAttraction={this.handleNewAttraction}
            ></DayCards>
            {/*<div className="scrolling-wrapper">*/}
            {/*    /!*<ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>*!/*/}
            {/*      {this.props.days.map(*/}
            {/*          (day, id) => this.renderDayCard(day, id))}*/}
            {/*    /!*</ScrollMenu>*!/*/}
            {/*</div>*/}

            <div className={"row d-flex justify-content-evenly mt-4"}>
              <Col xs={12} md={9} style={{padding: 0}}>
                <MyMap
                    getMarkersLatLng={this.props.getMarkersLatLng}
                    mapCenter={this.state.mapCenter}
                ></MyMap>
              </Col>
              <Col xs={6} md={3}>
                <Recommendations
                    recommendations={this.props.recommendations}
                    newRecommendations={this.props.newRecommendations}
                    mapCenter={this.state.mapCenter}
                    cityObj={this.props.cities[0]}
                >
              </Recommendations>
              </Col>
            </div>
        </div>
        </>
    );
  }
}

const Arrow = ({text, className}) => {
  return (
      <div
          className={className}
      >{text}</div>
  );
};

function LeftArrow() {
  const {isFirstItemVisible, scrollPrev} = React.useContext(VisibilityContext);

  return (
      <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
        Left
      </Arrow>
  );
}

function RightArrow() {
  const {isLastItemVisible, scrollNext} = React.useContext(VisibilityContext);

  return (
      <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
        Right
      </Arrow>
  );
}


// export default GoogleApiWrapper({
//   apiKey: (key1),
// })(MapContainer);
