import React, {Component} from 'react';
import key1 from '../key';
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import Scroll from './horizontalscroll';
import DayCard from './DayCard';

import {Container} from 'react-bootstrap';

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
  }

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
        <Container fluid>
          <div id="googleMaps">
            {/*// Array of Date cards*/}
            <ScrollMenu
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
            >
              {this.props.days.map((day, id) => this.renderDayCard(day, id))}
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
                    <input
                        {...getInputProps({
                          placeholder: 'Search Places ...',
                          className: 'location-search-input',
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                            ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                            : {backgroundColor: '#ffffff', cursor: 'pointer'};
                        return (
                            <div
                                {...getSuggestionItemProps(suggestion,
                                    {className, style,}
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
            <button type="button" onClick={this.clearMarks}>Clear</button>

            <Map
                style={{height: '50%', width: '50%'}}
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

        </Container>
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
