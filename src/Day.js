import moment from 'moment';

class Day{
  constructor(date) {
    this.date = moment(date);
    this.attractions = []
  }
}

export default Day;