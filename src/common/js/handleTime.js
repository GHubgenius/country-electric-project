import moment from 'moment';

function time (time, format = 'YYYY-MM-DD') {
  if (time) {
    return moment(time).format(format);
  }
  return time;
}

export default time;
