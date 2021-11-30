import React, {Component} from 'react';
import "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {GoogleApiWrapper, Map, Marker, InfoWindow} from 'google-maps-react';

import key1 from '../key';

export class MyMap extends Component{

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };


  renderMarkers =  () => {

    const markerLatLng = this.props.getMarkersLatLng();
    console.log(markerLatLng);
    return markerLatLng.map( (marker, id) =>
        <Marker key={`Marker${id}`}
                position={{lat: marker.lat, lng: marker.lng}}
                onClick={this.onMarkerClick}
        />
    );
  };

  onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render(){
    const shadow = {
      "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"};
    const style = {
      // width: '60vw',
      height: '100vh',
      position: "relative",
      ...shadow
    };
    return  (
        <div style={style}>
        <Map
            className={"shadow p-3 mb-5 bg-white rounded"}
            style={{ padding: "5% 5% 5% 5%",
            }}
            google={this.props.google}
            onClick={this.onMapClicked}
            initialCenter={{
              lat: this.props.mapCenter.lat,
              lng: this.props.mapCenter.lng,
            }}
            center={{
              lat: this.props.mapCenter.lat,
              lng: this.props.mapCenter.lng,
            }}
        >
          {this.renderMarkers()}
          <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
        </div>
    );

  }
}

export default GoogleApiWrapper({
  apiKey: (key1),
})(MyMap);

