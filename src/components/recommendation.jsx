import { distanceAndSkiddingToXY } from '@popperjs/core/lib/modifiers/offset';
import React, {Component} from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
//import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react'
//import key1 from '../key';


class Recommendation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attractions: [],
            mapCenter: {
                lat: -91,
                lng: -181,
            },
        };
        this.createTable = this.createTable.bind(this);
        this.determineCoordinates(this.props.cityObj);
    }

    getLocationObject = address => geocodeByAddress(address);

    determineCoordinates(newGeoObj) {
        getLatLng(newGeoObj)
        .then(latLng => {
            console.log('Determined coordinates:', latLng);
            // update center state
            this.setState({mapCenter: latLng});
        })
        .then(() => {
            let centre = new window.google.maps.LatLng(this.state.mapCenter.lat, this.state.mapCenter.lng);
            let service = new window.google.maps.places.PlacesService(document.createElement('div'));
            service.textSearch({
                query: this.props.cityObj.formatted_address + 'points of interest'
                /*location: centre,
                radius: 1000,
                rankby: 'distance',
                type: 'point_of_interest'*/
            }, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    console.log(results);
                    this.setState({
                        attractions: results,
                    });
                }
            });
        })
        .catch(error => console.error('Error', error));
        
    }

    createTable() {
        const {attractions} = this.state;
        let table = 
            <table style={{width:'100%'}}>
                <caption style={{captionSide: "top"}}>Recommended Attractions for {this.props.cityObj.formatted_address}</caption>
                <tr>
                    <th>#</th>
                    <th>Attraction</th>
                </tr>
                {attractions.map((attraction, index) => <tr>
                    <td>{index})</td>
                    <td>{attraction.name}</td>
                </tr>)
                }
            </table>;
        return table;
    }

    render() {
        let table = this.createTable();
        return (
            <div style={{marginTop: "800px"}}>
                {table}
            </div>
        );
    }
}

export default Recommendation;