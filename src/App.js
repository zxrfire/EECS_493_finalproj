import logo from './logo.svg';
import './App.css';
import Map from './components/googlemap.js'
import {GoogleApiWrapper} from "google-maps-react";
import MyComponents from "./components/googlemap.js";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import ReactGoogleAutocomplete from "react-google-autocomplete";
import key from "./key";
import React from "react";
import Autocomplete from "react-google-autocomplete";
import GoogleMap from './components/googlemap';

function App() {

  return (
    <div className="App">
      {/*<header className="App-header">
      </header>*/}
      <GoogleMap/>
    </div>
  );
}

export default App;
