import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import "../style/MapContainer.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const MapSuggestionBox = (props) => {

  const renderSuggestion = (getSuggestionItemProps, suggestion) => {
    let className = 'suggestion-item';
    if (suggestion.active){
      className += "--active";
    }
    // const className = suggestion.active ? 'suggestion-item--active':'suggestion-item';
    let style = {
      cursor: 'pointer',
      backgroundColor: suggestion.active ? '#fafafa' : '#ffffff'
    };
    return (
        <div
            {...getSuggestionItemProps(suggestion,
                {className, style})}>
          <span>{suggestion.description}</span>
        </div>
    );
  };

  const renderSuggestions = (getSuggestionItemProps, suggestions) => {
      return suggestions.map(suggestion => renderSuggestion(getSuggestionItemProps, suggestion));
  };

  const renderInput = (getInputProps) => {
    let inputProps = getInputProps({
        placeholder: 'Search for Attractions to Add To Your Iternary',
        className: 'location-search-input'});
    inputProps["className"] += "form-control";
    return (
        <div className="input-group mb-3" style={{"margin-top": "1%"}}>
          <input {...inputProps} style={{"width": "100%"}}/>
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