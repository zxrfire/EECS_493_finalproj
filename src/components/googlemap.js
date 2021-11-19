import React, {Component} from 'react';
import key1 from '../key';
import '../style/MapContainer.css';
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import Scroll from './horizontalscroll';
import DayCard from './DayCard';

import {Container, Row, Col, Button} from 'react-bootstrap';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for google map places autocomplete
      address: '',

      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapCenter: {
        lat: 49.2827291,
        lng: -123.1207375,
      },
      markers: [],
      names: [],
    };
    this.clearMarks = this.clearMarks.bind(this);
    this.updateMapCenter(props.cities[0]['formatted_address']);
    geocodeByAddress().
        then(results => getLatLng(results[0])).
        then(latLng => {
          console.log('Success', latLng);
          this.setState({markers: [...this.state.markers, latLng]});
          // update center state
          this.setState({mapCenter: latLng});
        });
  }

  // componentDidMount(){
  //   this.updateMapCenter(this.props.city[0])
  // }

  updateMapCenter = (address) =>
      geocodeByAddress(address).
          then(results => getLatLng(results[0])).
          then(latLng => {
            console.log('Success', latLng);
            this.setState({markers: [...this.state.markers, latLng]});
            // update center state
            this.setState({mapCenter: latLng});
          }).
          catch(error => console.error('Error', error));

  handleChange = address => {
    this.setState({address});
  };

  handleSelect = address => {
    this.setState({address});
    this.setState({names: [...this.state.names, address]});
    this.updateMapCenter(address);
    //Call Scroll's setItems method now
  };

  clearMarks() {
    this.setState({
      markers: [],
    });
  }

  renderDayCard = (day, idx) => {
    return (
        <DayCard day={day}>
        </DayCard>
    );
  };

  render() {
    let marks = this.state.markers;
    //let data1 = this.state.names;
    return (
        <div id="my-container">
              {/*// Array of Date cards*/}
                <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                  {this.props.days.map(
                      (day, id) => this.renderDayCard(day, id))}
                </ScrollMenu>

                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                    requestOptions={'tourist-attractions'}
                >
                  {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <div className="centeredRow">
                          <input
                              {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                              })}
                          />
                        </div>
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ?
                                {backgroundColor: '#fafafa', cursor: 'pointer'}
                                :
                                {backgroundColor: '#ffffff', cursor: 'pointer'};
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion,
                                        {className, style},
                                    )}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                            );
                          })}
                        </div>
                      </div>
                  )}
                </PlacesAutocomplete>
                    <Button onClick={this.clearMarks}>Clear</Button>

              <div className={"centeredRow"} >
                  <Map
                      style={{ padding: "5% 5% 5% 5%",
                        position: "relative",
                        height: "75%",
                        "margin-top": "2%",
                        "margin-left": "12.5%",
                        "margin-right": "12.5%",
                        width: "75%"}}
                      google={this.props.google}
                      initialCenter={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng,
                      }}
                      center={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng,
                      }}
                  >
                    {/*<Marker*/}
                    {/*    position={{*/}
                    {/*        lat: this.state.mapCenter.lat,*/}
                    {/*        lng: this.state.mapCenter.lng*/}
                    {/*    }} />*/}
                    {marks.map((marker, id) => (
                        <Marker
                            position={{lat: marker.lat, lng: marker.lng}}
                        />
                    ))}
                  </Map>

              </div>

        </div>
    );
  }
}

const Arrow = ({text, className}) => {
  return (
      <div
          className={className}
      >{text}</div>
  );
};

function LeftArrow() {
  const {isFirstItemVisible, scrollPrev} = React.useContext(VisibilityContext);

  return (
      <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
        Left
      </Arrow>
  );
}

function RightArrow() {
  const {isLastItemVisible, scrollNext} = React.useContext(VisibilityContext);

  return (
      <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
        Right
      </Arrow>
  );
}

//
// function Card({
//     onClick,
//     selected,
//     title,
//     itemId
//   }) {
//     const visibility = React.useContext(VisibilityContext);
//
//     return (
//       <div
//         onClick={() => onClick(visibility)}
//         style={{
//           width: "160px",
//         }}
//         tabIndex={0}
//       >
//         <div className="card">
//           <div>{title}</div>
//           <div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
//           <div>selected: {JSON.stringify(!!selected)}</div>
//         </div>
//         <div
//           style={{
//             height: "200px",
//           }}
//         />
//       </div>
//     );
//   }

export default GoogleApiWrapper({
  apiKey: (key1),
})(MapContainer);
