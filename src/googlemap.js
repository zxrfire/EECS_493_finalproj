import React, {Component} from 'react';
import key1 from './key'
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import {ScrollMenu, VisibilityContext} from "react-horizontal-scrolling-menu";


const getItems = () =>{
    return Array(20)
        .fill(0)
        .map((_, ind) => ({
                id: `(fixme replace with actual date) day-${ind}`}
        ))
    };

function Scroll() {
    const [items, setItems] = React.useState(getItems);
    const [selected, setSelected] = React.useState([]);
    const [position, setPosition] = React.useState(0);

    const isItemSelected = (id) => !!selected.find((el) => el === id);

    const handleClick = (id) => ({ getItemById, scrollToItem }) => {
        const itemSelected = isItemSelected(id)

        setSelected((currentSelected) =>
            itemSelected
                ? currentSelected.filter((el) => el !== id)
                : currentSelected.concat(id)
        );
    }

    return (
        <ScrollMenu
            // LeftArrow={LeftArrow}
            // RightArrow={RightArrow}
        >
            {items.map(({ id }) => (
                <Card
                    itemId={id} // NOTE: itemId is required for track items
                    title={id}
                    key={id}
                    attraction={'effiel tower'}
                    onClick={handleClick(id)}
                    selected={isItemSelected(id)}
                />)
            )}

        </ScrollMenu>
    );
}

// function LeftArrow() {
//     const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext)
//
//     return (
//         <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
//             Left
//         </Arrow>
//     );
// }
//
// function RightArrow() {
//     const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext)
//
//     return (
//         <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
//             Right
//         </Arrow>
//     );
// }

function Card({
                  onClick,
                  title,
                attraction,
              }) {
    const visibility = React.useContext(VisibilityContext)

    return (
        <div
            onClick={() => onClick(visibility)}
            style={{
                width: "160px",
            }}
            tabIndex={0}
        >
            <div className="card">
                <div>{title}</div>
                <div>attraction: {attraction}</div>

            </div>
            <div
                style={{
                    height: "200px",
                }}
            />
        </div>
    );
}

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
                lng: -123.1207375
            },
            markers: [],
        };
        this.clearMarks = this.clearMarks.bind(this);
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        this.setState({ address });
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng);
                this.setState({ markers: [...this.state.markers, latLng] })
                // update center state
                this.setState({ mapCenter: latLng });
            })
            .catch(error => console.error('Error', error));
    };

    clearMarks() {
        this.setState({
            markers: []
        });
    }
// const menu = {}
    render() {
        let marks = this.state.markers;
        return (
            <div id='googleMaps'>
                <Scroll>
                    {/*data={menu}*/}
                </Scroll>
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                    requestOptions={'tourist-attractions'}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
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
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
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
                    google={this.props.google}
                    initialCenter={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                    }}
                    center={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                    }}
                >
                    {/*<Marker*/}
                    {/*    position={{*/}
                    {/*        lat: this.state.mapCenter.lat,*/}
                    {/*        lng: this.state.mapCenter.lng*/}
                    {/*    }} />*/}
                    {marks.map((marker, id) => (
                        <Marker
                            position={{ lat: marker.lat, lng: marker.lng }}
                        />
                    ))}
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (key1)
})(MapContainer)
