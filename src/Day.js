import moment from 'moment';

class Day{
  constructor(date) {
    this.date = moment(date);
    this.places = new Map(); // a list of location objects
  }

  clearPlaces() {
    this.places.clear();
  }

  addPlace(newAddress, newGeoObj, newLatLng){
    this.places.set(newAddress, new Place(newGeoObj, newLatLng));
  }

  deletePlace(address){
    this.places.delete(address);
  }
}

class Place{
  constructor(geoObj, latLng) {
    this.plannedTime = null;
    this.geoObj = geoObj;
    this.latLng = latLng;
  }
}

export default Day;