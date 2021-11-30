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
    this.hadDetails = false;
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

  static formQuery = (placeID, fields) => {
    let query = `https://warm-savannah-56575.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&fields=`;
    const sep = "%2C";
    for (let i = 0; i < fields.length; ++i){
      query += fields[i];
      if (i !== fields.length - 1){
        query += sep;
      }
    }
    query += `&key=${key}`;
    return query;
  };

  getDetailedInfo = async () => {
      if (this['place_id'] && !this.hadDetails){
        const axios = require('axios');
        let fields = ["formatted_phone_number",
          "international_phone_number", "opening_hours/weekday_text", "website"];
        if (! this.imageURL && !this['photo']){
          fields.push("photo");
        }
        if (! this['rating']){
          fields.push("rating");
        }

        const config = {
          method: 'get',
          url: Place.formQuery(this['place_id'], fields),
          headers: {'Access-Control-Allow-Origin': '*'},
          withCredentials: false,
        };

        await axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.hadDetails = true;
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  };
}

export default Place;