import React, {Component, Fragment} from 'react';
import "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {GoogleApiWrapper, Map, Marker, InfoWindow} from 'google-maps-react';
import GoogleMap from 'google-map-react';
import MarkerInfo from './MarkerInfo'
import key1 from '../key';
import {Row} from 'react-bootstrap';
import PlaceDetails from './PlaceDetails';

export class MyMap extends Component{

  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      // markersVisible: Array(this.props.getSelectedPlaces.length).fill(false),
      activeMarker: {},
      selectedPlace: {},
      currentDayIndex: null,
      currentPlaceIdx: null,
      place: null,
    };
  }

  // componentDidMount() {
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state !== prevState){
      console.log("Component updated");
      this.obtainInfo();
    }
  }

  renderMarkers =  () => {
    const dayMarkers= this.props.getSelectedPlaces();
    // const newVisibilities =Array(this.props.getSelectedPlaces.length).fill(false);
    // this.setState({markersVisible: newVisibilities});

    console.log(`Render markers`);
    console.log(dayMarkers);
    return dayMarkers.map( (markerTup, markerId) => {
      const dayID = markerTup[0];
      const markerPlace = markerTup[2];
      const {lat, lng} = markerPlace.latLng;
      console.log(`Marker's Place ${markerPlace}`);
      return (
          // <Fragment>
            <Marker key={`Marker${markerId}`}
                    place={markerPlace}
                    dayID={dayID}
                    placeID={markerTup[1]}
                    place={markerPlace}
                    position={{lat: lat, lng: lng}}
                    onClick={this.onMarkerClick}>
            </Marker>
         );
      });



  };

  obtainInfo = () => {
    if (this.state.currentDayIndex != null && this.state.currentPlaceIdx != null){
      this.props.morePlaceInfo(this.state.currentDayIndex, this.state.currentPlaceIdx)
    }
  };


  onMarkerClick = (props, marker, e) =>{
    // await this.props.morePlaceInfo(props.dayID, props.placeID);
    // console.log(`window appear set to true`);
    this.setState({
      place: props.place,
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
        currentDayIndex: props.dayID,
        currentPlaceIdx: props.placeID,
    });



  };


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
          {this.state.place &&
          <InfoWindow
              style={{"minWidth": "20%"}}
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
            <Fragment>
              <Row>
                <h4>{this.state.place && this.state.place.address}</h4>
              </Row>
              <PlaceDetails place={this.state.place}
                            morePlaceInfo={this.obtainInfo}>
              </PlaceDetails>
            </Fragment>
            {/*<iframe width="560" height="315"*/}
            {/*        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"*/}
            {/*        title="YouTube video player" frameBorder="0"*/}
            {/*        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
            {/*        allowFullScreen></iframe>*/}
          </InfoWindow>}
        </Map>
        </div>
    );

  }
}

export default GoogleApiWrapper({
  apiKey: (key1),
})(MyMap);

