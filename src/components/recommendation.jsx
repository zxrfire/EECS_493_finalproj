import React from 'react';
//import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react'
//import key1 from '../key';


const Recommendation = props => {


    const getRecommendations = () => {
        let service = new window.google.maps.places.PlacesService(document.createElement('div'));
        service.textSearch({query: props.cityObj.formatted_address + 'points of interest'},
            (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    console.log(results);
                    props.newRecommendations(results);
                }
            }
        );
    };

    getRecommendations();

    const createTable = () => {
        const {recommendations} = props;
        return <table style={{width: '100%'}}>
            <caption style={{captionSide: "top"}}>Recommended Attractions
                for {props.cityObj.formatted_address}</caption>
            <tr>
                <th>#</th>
                <th>Attraction</th>
            </tr>
            {recommendations.map((attraction, index) => <tr>
                <td>{index})</td>
                <td>{attraction.name}</td>
            </tr>)
            }
        </table>;
    };

    return (
        <div>
            {createTable()}
        </div>
    );
};

export default Recommendation;