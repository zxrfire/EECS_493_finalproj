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

  addPlace(newAddress, newGeoObj, newLatLng) {
    this.places.push(new Place(newAddress, newGeoObj, newLatLng));
    //this.sortAttractions();
  }

  deletePlace(addressIdx){
    this.places.splice(addressIdx, 1);
  }

  setAttractionTime(placeIndex, plannedTime) {
    this.places[placeIndex].plannedTime = plannedTime;
    this.sortAttractions();
  }

  sortAttractions() {
    this.places.sort(this.sortByTime);
  }

  sortByTime(place1, place2) {
    const a = place1.plannedTime;
    const b = place2.plannedTime;
    if (a === null || b == null){
      if (a == null && b == null){
        return 0;
      }
      if (a == null){
        return 1; // put null last. put b before a
      }
      // b == null
      return -1; // put a before b
    }
    return a.valueOf() - b.valueOf();
    // return a.plannedTime < b.plannedTime ? -1 : (a.plannedTime > b.plannedTime ? 1 : 0);/**/
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