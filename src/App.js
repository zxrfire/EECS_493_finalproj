import logo from './logo.svg';
import './App.css';
import Map from './googlemap.js'
import {GoogleApiWrapper} from "google-maps-react";
import MyComponents from "./googlemap.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
        <div> text</div>
            <div style={{width: "50%", height: "50%"}}>
                <MyComponents/>
            </div>
    </div>
  );
}

export default App;
