import moment from 'moment';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import key from "./key"
import axios from 'axios';
import { Loader } from "@googlemaps/js-api-loader"
const loader = new Loader({
  apiKey: key,
  version: "weekly",
});

class Place {
  static CORS = "https://warm-savannah-56575.herokuapp.com/";
  constructor(newAddress, geoObj, latLng) {
    this.address = newAddress;
    this.plannedTime = null;
    this.geoObj = geoObj;
    this.latLng = latLng;
    this.place_id = null;
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

  static formDetailedQuery = (placeID, fields) => {
    let query = `${Place.CORS}https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&fields=`;
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

  getImageURL = async (photoReference) => {
    console.log(`Getting image`);
    const url =
    `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&sensor=false&maxheight=1600&maxwidth=1600&key=${key}`;
    console.log(url);
    // console.log(`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photoReference}&key=${key}`);
    const config = {
      method: 'get',
      url: `${Place.CORS}${url}`,
      headers: {"Access-Control-Allow-Headers": true, 'X-Requested-With': 'XMLHttpRequest'},
      withCredentials: false,
      responseType: 'blob'
    };


    await axios(config).then(
        photoResponse => {
          // const imageNode = document.getElementById('image');
          const imgUrl = URL.createObjectURL(photoResponse.data);
          console.log(photoResponse);
          this.imageURL = imgUrl;
        }
    );

    // await loader
    // .load()
    // .then((google) => {
    //   [this['photos'][0]].forEach( (placePhoto) =>{
    //     this.imageURL = google.maps.places.PlacePhoto.getUrl({
    //       maxWidth: 600,
    //       maxHeight: 400
    //     });
    //   });
    // })
    // .catch(e => {
    //   // do something
    // });
  };

  getDetailedInfo = async () => {
      if (this['geoObj']){
        this.place_id = this.geoObj.place_id;
      }
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
          url: Place.formDetailedQuery(this['place_id'], fields),
          headers: {'Access-Control-Allow-Origin': '*'},
          withCredentials: false,
        };

        await axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.hadDetails = true;
          for (const [key, value] of Object.entries(response.data.result)) {
            this[key] = value;
          }
        })
        .catch(function (error) {
          console.log(error);
        });

        if (this['photos']){
          console.log(`Phref${this.photos[0]['photo_reference']}`);
          const photoRef = this.photos[0]['photo_reference'];
          await this.getImageURL(photoRef);
        }
      }
  };
}

export default Place;