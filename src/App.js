import logo from './logo.svg';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import StartPage from './components/StartPage'
import ItineraryPage from './components/ItineraryPage';
import {Component} from 'react';
import React from "react";
import MapContainer from './components/googlemap';
import moment from 'moment';
import Day from "./Day"

class App extends Component{
  constructor(props) {
    super(props);
    // initialise the state variables
    this.state = {
      startDate: null,
      endDate: null,
      cities: [],
      days: [],
      currentdays: [],
      recommendations: []
    }
  };
  handleNewStartDate = (event) => {
      this.setState({startDate: moment().format(event.target.value)});
  };
  handleNewEndDate = (event) => {
    this.setState({endDate:  moment().format(event.target.value)});
  };
  handleNewCity = (city) => {
    this.setState({cities: [...this.state.cities, city]});
  };
  handleCreateTrip = (event) => {
    console.log("Creating new Trip");
    let newDays = [];
    // generate the trip dates
    // TODO: iterate through the days
    // If you want an inclusive end date (fully-closed interval)
    for (let m = moment(this.state.startDate);
      m.diff(this.state.endDate, 'days') <= 0; m.add(1, 'days')) {
      console.log(m.format('YYYY-MM-DD'));
      newDays.push(new Day(m.format('YYYY-MM-DD')))

    }
    this.setState({days: newDays});
    let newday = []
    newDays.forEach((ele, index) => {
        newday.push(index)
    })
    this.setState({currentdays: newday})
  };

  handleNewAttraction = (indexOfDay, newAddress, newGeoObj, newLatLng) =>{
    let newDays = [...this.state.days];
    newDays[indexOfDay].addPlace(newAddress, newGeoObj, newLatLng);
    this.setState({days: newDays});
  };

  handleDeleteAttraction = (indexOfDay, placeIndex) => {
    let newDays = [...this.state.days];
    newDays[indexOfDay].deletePlace(placeIndex);
    this.setState({days: newDays});
  };

  handleClearAttractions = (indexOfDay) => {
    let newDays = [...this.state.days];
    newDays[indexOfDay].clearPlaces();
    this.setState({days: newDays});
  };

  handleToggleDisplayMarkers = (indexOfDay) => {
    let newDays = [...this.state.days];
    newDays[indexOfDay].toggleDisplayMarkers();
    this.setState({days: newDays});
  };

  setAttractionTime = (indexOfDay, placeIndex, plannedTime) => {
    let newDays = [...this.state.days];
    newDays[indexOfDay].setAttractionTime(placeIndex, plannedTime);
    this.setState({days: newDays});
  }

  /*sortAttractions = (indexOfDay) => {
    let newDays = [...this.state.days];
    newDays[indexOfDay].sortAttractions(); //sort attractions by time for this day
    this.setState({days: newDays});
  };*/

  /*
  showMarkersByDay = (indexOfDay) =>{
      if (this.state.days.length === this.state.currentdays.length){
         this.setState({currentdays: [indexOfDay]})
      }
     else{
         // this.setState({currentdays: [[...this.state.currentdays]]})
         this.setState({currentdays: [indexOfDay]})
      }
   };*/

  getMarkerLatLng = () => {
    // let currdays = [];
    // this.state.currentdays.forEach(index => currdays.push(this.state.days[index]));
    const markers = this.state.days.filter(day => day.displayMarkers).map(
        day => day.places.map(place => place.latLng)
    ).flat(1);
    console.log("Markers");
    console.log(markers);
    return markers;
  };

  handleNewRecommendation = (newRecommendations) => {
    this.setState({recommendations: newRecommendations});
  };


  render(){
    return (
        <BrowserRouter>
          <div className="App">
              <Routes>
                <Route path="/" element={
                  <StartPage
                      newStartDate={this.handleNewStartDate}
                      newEndDate={this.handleNewEndDate}
                      newTrip={this.handleCreateTrip}
                      newCity={this.handleNewCity}
                  ></StartPage>
                }/>
                  <Route path="itinerary" element={
                    <ItineraryPage></ItineraryPage>
                  }/>
                <Route path="/map" element={
                  <MapContainer {...this.state}
                    newAttraction={this.handleNewAttraction}
                    newRecommendations={this.handleNewRecommendation}
                    toggleDisplayMarkers={this.handleToggleDisplayMarkers}
                    clearAttractions={this.handleClearAttractions}
                    deleteAttraction={this.handleDeleteAttraction}
                    getMarkersLatLng={this.getMarkerLatLng}
                    showMarkersByDay={this.showMarkersByDay}
                    setAttractionTime={this.setAttractionTime}
                    //sortAttractions={this.sortAttractions}
                  ></MapContainer>
                } />
              </Routes>
          </div>

        </BrowserRouter>
    );
  }
}

export default App;
