import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import StartPage from './components/StartPage'
import ItineraryPage from './components/ItineraryPage';
import Trip from './Trip'
import {Component} from 'react';

class App extends Component{
  constructor(props) {
    super(props);
    // initialise the state variables
    this.state = {
      startDate: null,
      endDate: null,
      tripDates: []
    }
  };
  handleNewStartDate = (event) => {
      this.setState({startDate: event.target.value});
  };
  handleNewEndDate = (event) => {
      this.setState({endDate: event.target.value});
  };
  handleCreateTrip = (event) => {
      console.log("Creating new Trip");
      // generate the trip dates


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
                  ></StartPage>
                }/>
                  <Route path="itinerary" element={
                    <ItineraryPage></ItineraryPage>
                  }/>
              </Routes>
          </div>

        </BrowserRouter>
    );
  }
}

export default App;
