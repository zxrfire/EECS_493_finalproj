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
import logo from '../tripwithmelogo.png'

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

  updateMap = (latLng) => {
            console.log('Success', latLng);
            // this.setState({markers: [...this.state.markers, latLng]});
            // update center state
            this.setState({mapCenter: latLng});
          };

  handleNewAttraction = async (id, address) => {
    console.log(address);
    const newPlace = await this.props.newAttraction(id, address);
    console.log(newPlace);
    await this.updateMap(newPlace.latLng);
    return newPlace;
  };

  render() {
    return (
        <>
            {/*<a href='/'><img src={logo} style={{height:"100px", width: "100px"}}/></a>*/}
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
                    usedDragDrop={this.props.usedDragDrop}
                    setUsedDragDrop={this.props.setUsedDragDrop}
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
