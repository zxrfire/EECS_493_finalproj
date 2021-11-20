import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import "../style/MapContainer.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const MapSuggestionBox = (props) => {

  const renderSuggestion = (getSuggestionItemProps, suggestion) => {
    let className = 'list-group-item list-group-item-action';
    if (suggestion.active){
      className += " active";
    }
    // const className = suggestion.active ? 'suggestion-item--active':'suggestion-item';
    let style = {
      cursor: 'pointer',
      // backgroundColor: suggestion.active ? '#fafafa' : '#ffffff'
    };
    return (
          <a {...getSuggestionItemProps(suggestion,
              {className, style})}>{suggestion.description}</a>
    );
  };

  const renderSuggestions = (getSuggestionItemProps, suggestions) => {
      return (
          <div className="list-group" style={{"margin-bottom": "1%"}}>
            {suggestions.map(suggestion => renderSuggestion(getSuggestionItemProps, suggestion))}
          </div>
      );
  };

  const renderInput = (getInputProps) => {
    let inputProps = getInputProps({
        placeholder: 'Search for Attractions to Add To Your Iternary',
        className: 'location-search-input'});
    inputProps["className"] += "form-control";
    return (
        <div className="input-group mb-3" style={{"margin-top": "1%"}}>
          <input {...inputProps} />
        </div>
    );
  };

  return (
      <PlacesAutocomplete
          {...props}
          requestOptions={'tourist-attractions'}
      >
        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
            <div>
              {renderInput(getInputProps)}

              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {renderSuggestions(getSuggestionItemProps, suggestions)}
              </div>
            </div>
        )}
      </PlacesAutocomplete>
  );
};

export default MapSuggestionBox;