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
        days: []
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
        newDays.push(new Day(m.format('YYYY-MM-DD')));
      }
      this.setState({days: newDays});
  };

  handleNewAttraction = (indexOfDay, newAddress, newAddressObj) =>{
      let newDays = [...this.state.days];
      newDays[indexOfDay].addPlace(newAddress, newAddressObj);
      this.setState({days: newDays});
  };

  handleDeleteAttraction = (indexOfDay, addressToDelete) => {
      let newDays = [...this.state.days];
      newDays[indexOfDay].deletePlace(addressToDelete);
      this.setState({days: newDays});
  };

  handleClearAttraction = (indexOfDay) => {
    let newDays = [...this.state.days];
    newDays[indexOfDay].clear();
    this.setState({days: newDays});
  };

  getMarkers = () => {
    return this.state.days.map(day =>  Array.from(day.places.values())).flat(1);
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
                  clearAttraction={this.handleClearAttraction}
                  deleteAttraction={this.handleDeleteAttraction}
                  getMarkers={this.getMarkers}
                  ></MapContainer>
                } />
              </Routes>
          </div>

        </BrowserRouter>
    );
  }
}

export default App;
