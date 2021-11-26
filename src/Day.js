import moment from 'moment';

class Day{
  constructor(date) {
    this.date = moment(date);
    this.places = new Map(); // a list of location objects
  }

  clearPlace() {
    this.places.clear();
  }

  addPlace(newAddress, newGeoObj){
    this.places.set(newAddress, newGeoObj);
  }

  deletePlace(address){
    this.places.delete(address);
  }
}

export default Day;