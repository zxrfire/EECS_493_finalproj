import moment from 'moment';

class Day{
  constructor(date) {
    this.date = date;
    this.day = moment(date).format('dddd');
    this.attractions = []
  }
}

export default Day;