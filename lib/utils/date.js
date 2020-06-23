import moment from 'moment';

const convertIsoDateToObject = date => {
  const _date = moment(date).utc();
  return { day: _date.date(), month: _date.month() + 1, year: _date.year() };
};

const convertObjectToIsoDate = ({ year, month, day }) => {
  try {
    return new Date(Date.UTC(year, month - 1, day)).toISOString();
  } catch {
    return null;
  }
};

const convertIsoDateToString = date => {
  return moment(date)
    .utc()
    .format('DD/MM/YYYY');
};

export {
  convertIsoDateToObject,
  convertIsoDateToString,
  convertObjectToIsoDate
};
