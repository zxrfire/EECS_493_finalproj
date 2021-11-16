import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import key from './key'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

    export default class MyClass extends Component {
    constructor(props){
        super(props);
        this.state = {
            markers: [],
        }
    }

    componentDidMount(){
        // or you can set markers list somewhere else
        // please also set your correct lat & lng
        // you may only use 1 image for all markers, if then, remove the img_src attribute ^^
        this.setState({
            markers: [{lat: 1, lng: 1}],
        });
    }

    render() {
        return (
            <div>
            <GoogleMapReact
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                style={{height: '300px'}}
                apiKey={key}
            >
                {this.state.markers.map((marker, i) =>{
                    return(
                        <AnyReactComponent
                            lat={marker.lat}
                            lng={marker.lng}
                        />
                    )
                })}
            </GoogleMapReact>
        {/*<GooglePlacesAutocomplete*/}
        {/*    apiKey={key}*/}
        {/*    types={{}}*/}
        {/*/>*/}
            </div>
        );
    }
}
MyClass.defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
};
