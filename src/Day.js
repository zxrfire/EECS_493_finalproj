import moment from 'moment';

class Day{
  constructor(date) {
    this.date = moment(date);
    // key: address
    this.places = []; // a list of location objects
    this.displayMarkers = true;
  }

  toggleDisplayMarkers(){
    this.displayMarkers = !this.displayMarkers;
  }

  clearPlaces() {
    this.places = [];
  }

  addPlace(newAddress, newGeoObj, newLatLng){
    this.places.push(new Place(newAddress, newGeoObj, newLatLng));
  }

  deletePlace(addressIdx){
    this.places.splice(addressIdx, 1);
  }
}

class Place{
  constructor(newAddress, geoObj, latLng) {
    this.address = newAddress;
    this.plannedTime = null;
    this.geoObj = geoObj;
    this.latLng = latLng;
  }
}

export default Day;