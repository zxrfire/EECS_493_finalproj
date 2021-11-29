import React from 'react';
//import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react'
//import key1 from '../key';


const Recommendations = props => {


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



    const renderList = () => {
        const {recommendations} = props;
        return recommendations.map(attraction => (
            <div className={"card shadow-sm p-2 mb-2 bg-body rounded"}>
                <div className={"d-flex justify-content-between align-items-center "}>
                    {attraction.name}
                </div>
            </div>
        ));
    };

    const renderTitle = () => {
      return (
          <div className={"card-title"}>
              Recommended Attractions for {props.cityObj.formatted_address}
          </div>
      );
    };

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
        <div className={"card day_card shadow p-2 mb-5 bg-white rounded"}>
            {renderTitle()}
            <div className={"card-body"}>
                {renderList()}
            </div>
        </div>
    );
};

export default Recommendations;