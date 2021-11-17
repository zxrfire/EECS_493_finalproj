import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper } from 'google-maps-react';
//import GoogleMapReact from 'google-map-react';
//import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import key from './key'

//const AnyReactComponent = ({ text }) => <div>{text}</div>;

const mapStyles = {
  width: '50%',
  height: '50%'
};

export class MapContainer extends Component {
  render() {
    return (
        <div>
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={
                    {
                        lat: -1.2884,
                        lng: 36.8233
                    }
                }
            />
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: key
})(MapContainer);
