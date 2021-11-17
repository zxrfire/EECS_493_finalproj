import logo from './logo.svg';
import './App.css';
import Map from './googlemap.js'
import {GoogleApiWrapper} from "google-maps-react";
import MyComponents from "./googlemap.js";

function App() {
  return (
    <div className="App">
      <div>
          <MyComponents/>
      </div>
    </div>
  );
}

export default App;
