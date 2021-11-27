import React, {Component} from 'react';
import key1 from '../key';
import '../style/MapContainer.css';
// import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import DayCard from './DayCard';
import MyMap from './MyMap';
import Recommendation from './recommendation';

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

  // clearMarks() {
  //   this.setState({
  //     markers: [],
  //   });
  // }

  // renderMarkers =  () => {
  //   const markerLatLng = this.props.getMarkersLatLng();
  //   console.log(markerLatLng);
  //   return markerLatLng.map( (marker, id) =>
  //       <Marker key={`Marker${id}`}
  //         position={{lat: marker.lat, lng: marker.lng}}
  //   />
  //   );
  // };

  renderDayCard = (day, id) => {
    return (
        <DayCard day={day}
                 key={id} dayID={id}
                 newPlace={this.handleNewAttraction}
                 deletePlace={this.props.deleteAttraction}
                 clearPlaces={this.props.clearAttractions}
        >
        </DayCard>
    );
  };

  render() {
    //let data1 = this.state.names;

    const shadow = {
      "box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    };
    return (
        <div id="my-container">
              {/*// Array of Date cards*/}
                <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                  {/*<CardGroup>*/}
                  {this.props.days.map(
                      (day, id) => this.renderDayCard(day, id))}
                  {/*</CardGroup>*/}
                </ScrollMenu>

              <Button className={"shadow p-2 mb-5 rounded"}
                      onClick={this.clearMarks}>Clear</Button>

              {/*<div className={"centeredRow"} >*/}
            <Row>
              <Col xs={12} md={8}>
                <MyMap
                    getMarkersLatLng={this.props.getMarkersLatLng}
                    mapCenter={this.state.mapCenter}
                ></MyMap>
              </Col>
              <Col xs={6} md={4}>
                <Recommendation
                    recommendations={this.props.recommendations}
                    newRecommendations={this.props.newRecommendations}
                    mapCenter={this.state.mapCenter}
                    cityObj={this.props.cities[0]}
                >
              </Recommendation>
              </Col>
            </Row>
        </div>
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
