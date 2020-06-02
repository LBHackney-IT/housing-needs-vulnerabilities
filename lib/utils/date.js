import moment from 'moment';

const convertIsoDateToObject = date => {
  const _date = moment(date).utc();
  return { day: _date.date(), month: _date.month() + 1, year: _date.year() };
};

const convertIsoDateToString = date => {
  return moment(date)
    .utc()
    .format('DD/MM/YYYY');
};

export { convertIsoDateToObject, convertIsoDateToString };
