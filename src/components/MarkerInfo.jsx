import React, {Component} from 'react';
import {GoogleApiWrapper, Map, Marker, InfoWindow} from 'google-maps-react';
import PlaceDetails from './PlaceDetails';
import {Row} from 'react-bootstrap';
import {useState} from 'react';


const MarkerInfo = (props) => {

  const { place } = props;

  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
      <InfoWindow
          visible={visible}>
        <button type="button" className="btn btn-danger" onClick={handleClose}>Close</button>
        <Row>
          {place.name}
        </Row>

        <PlaceDetails place={place}></PlaceDetails>
        {/*<iframe width="560" height="315"*/}
        {/*        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"*/}
        {/*        title="YouTube video player" frameBorder="0"*/}
        {/*        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
        {/*        allowFullScreen></iframe>*/}
      </InfoWindow>
  );
};

export default MarkerInfo;