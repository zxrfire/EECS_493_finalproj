import React from 'react';
import '../style/MapContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecommendationCard from './RecommendationCard';
import {Accordion} from 'react-bootstrap';

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
        return recommendations.map((attraction, attractionId) => (
            <RecommendationCard attraction={attraction}
                                attractionId={attractionId}>
            </RecommendationCard>
        ));
    };

    const renderTitle = () => {
      return (
          <div className={"card-title"}>
            <h6>Recommended Attractions for:</h6>
            <h6>{props.cityObj.formatted_address}</h6>
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
            <div className={"card-body"}>
            {renderTitle()}
              <Accordion>

                {renderList()}
              </Accordion>
            </div>
        </div>
    );
};

export default Recommendations;