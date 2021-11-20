import moment from 'moment';

class Day{
  constructor(date) {
    this.date = moment(date);
    this.places = []; // a list of location objects
  }
}

export default Day;