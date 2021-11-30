import moment from 'moment';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import key from "./key"


class Place {
  constructor(newAddress, geoObj, latLng) {
    this.address = newAddress;
    this.plannedTime = null;
    this.geoObj = geoObj;
    this.latLng = latLng;
    this.placeID = null;
    this.imageURL = null;
  }

  prepGeoLat = async () => {
    this.geoObj = (await geocodeByAddress(this.address))[0];
    this.latLng = await getLatLng(this.geoObj);
  };

  static createFromAddress = async (newAddress) => {
    const newGeoObj = (await geocodeByAddress(newAddress))[0];
    const newLatLng = await getLatLng(newGeoObj);
    return new Place(newAddress, newGeoObj, newLatLng);
  };

  static createFromRecommendation = (recommendation) => {
    const address = recommendation.name;
    const newPlace = new Place(address, null, null);
    for (const [key, value] of Object.entries(recommendation)) {
      newPlace[key] = value;
    }

    if (newPlace['photos']){
      newPlace.imageURL = newPlace['photos'][0].getUrl();
    }

    return newPlace;
  };

  getDetailedInfo = async () => {
      if (this.placeID){
        const axios = require('axios');
        let queries = ["formatted_phone_number",
          "international_phone_number", "opening_hours", "website",
          "price_level"];
        if (! this.imageURL || !this['photo']){
          queries.push("photo");
        }


        const config = {
          method: 'get',
          url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name%2Crating%2Cformatted_phone_number&key=YOUR_API_KEY',
          headers: { }
        };
      }
  };
}

export default Place;