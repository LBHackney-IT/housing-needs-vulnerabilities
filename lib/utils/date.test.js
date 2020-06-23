import {
  convertIsoDateToObject,
  convertIsoDateToString,
  convertIsoDateToYears,
  convertObjectToIsoDate
} from 'lib/utils/date';

describe('date', () => {
  describe('convertIsoDateToObject', () => {
    it('gets a date object', () => {
      const result = convertIsoDateToObject('2022-10-20T00:00:00.000Z');
      expect(result).toEqual({
        day: 20,
        month: 10,
        year: 2022
      });
    });
  });

  describe('convertObjectToIsoDate', () => {
    it('gets a iso date from object', () => {
      const result = convertObjectToIsoDate({
        day: 20,
        month: 10,
        year: 2022
      });
      expect(result).toEqual('2022-10-20T00:00:00.000Z');
    });

    it('returns null if invalid', () => {
      const result = convertObjectToIsoDate({
        day: 20,
        month: 10
      });
      expect(result).toEqual(null);
    });
  });

  describe('convertIsoDateToString', () => {
    it('gets a date string', () => {
      const result = convertIsoDateToString('2022-10-20T00:00:00.000Z');
      expect(result).toEqual('20/10/2022');
    });
  });

  describe('convertIsoDateToYears', () => {
    it('gets the number of years from an iso date', () => {
      const year = new Date().getFullYear();
      const result = convertIsoDateToYears('1990-01-01T00:00:00.000Z');
      expect(result).toEqual(year - 1990);
    });
  });
});
