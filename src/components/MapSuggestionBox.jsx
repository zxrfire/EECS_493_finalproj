import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import "../style/MapContainer.css"

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

  return (
      <PlacesAutocomplete
          {...props}
          requestOptions={'tourist-attractions'}
      >
        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
            <div>
              <div className="centeredRow">
                <input
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input',
                    })
                    }/>
              </div>

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