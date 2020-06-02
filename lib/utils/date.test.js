import { convertIsoDateToObject, convertIsoDateToString } from 'lib/utils/date';

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

  describe('convertIsoDateToString', () => {
    it('gets a date string', () => {
      const result = convertIsoDateToString('2022-10-20T00:00:00.000Z');
      expect(result).toEqual('20/10/2022');
    });
  });
});
