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
      trip : {
        startDate: null,
        endDate: null,
        cities: [],
        days: []
      },
    }
  };
  handleNewStartDate = (event) => {
      const newTrip = {...this.state.trip};
      newTrip["startDate"] = moment().format(event.target.value);
      console.log(newTrip["startDate"]);
      this.setState({trip: newTrip});
  };
  handleNewEndDate = (event) => {
    const newTrip = {...this.state.trip};
    newTrip["endDate"] = moment().format(event.target.value);
    console.log(newTrip["endDate"]);
    this.setState({trip: newTrip});
  };
  handleNewCity = (city) => {
    const newTrip = {...this.state.trip};
    newTrip["cities"].append(city);
    this.setState({trip: newTrip});
  };
  handleCreateTrip = (event) => {
      console.log("Creating new Trip");
      const newTrip = {...this.state.trip};
      newTrip.days = [];
      // generate the trip dates
      // TODO: iterate through the days
      // If you want an inclusive end date (fully-closed interval)
      for (let m = moment(newTrip.startDate);
        m.diff(newTrip.endDate, 'days') <= 0; m.add(1, 'days')) {
        console.log(m.format('YYYY-MM-DD'));
        newTrip.days.push(new Day(m.format('YYYY-MM-DD')));
      }
      console.log(newTrip.days);
      this.setState({trip: newTrip});
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
                  <MapContainer trip={this.state.trip}></MapContainer>
                } />
              </Routes>
          </div>

        </BrowserRouter>
    );
  }
}

export default App;
