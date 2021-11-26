import React, {Component} from 'react';
import "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';

import key1 from '../key';

export class MyMap extends Component{

  renderMarkers =  () => {

    const markerLatLng = this.props.getMarkersLatLng();
    console.log(markerLatLng);
    return markerLatLng.map( (marker, id) =>
        <Marker key={`Marker${id}`}
                position={{lat: marker.lat, lng: marker.lng}}
        />
    );
  };

  render(){
    const shadow = {
      "box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"};
    const style = {
      width: '60vw',
      height: '60vh',
      position: "relative",
      // height: "75%",
      // "margin-top": "2%",
      // "margin-left": "12.5%",
      // "margin-right": "12.5%",
      // width: "75%",
      ...shadow
    };
    return  (
        <div style={style}>
        <Map
            className={"shadow p-3 mb-5 bg-white rounded"}
            style={{ padding: "5% 5% 5% 5%",
            }}
            google={this.props.google}
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
        </Map>
        </div>
    );

  }
}

export default GoogleApiWrapper({
  apiKey: (key1),
})(MyMap);

