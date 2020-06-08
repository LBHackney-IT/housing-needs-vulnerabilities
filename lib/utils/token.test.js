import { getToken, getUsername, createToken } from 'lib/utils/token';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
jest.mock('jsonwebtoken');
jest.mock('cookie');

describe('Token', () => {
  describe('getToken', () => {
    it('returns empty string if no request', () => {
      const result = getToken();
      expect(result).toEqual('');
    });

    it('returns empty string if no request headers', () => {
      const result = getToken({});
      expect(result).toEqual('');
    });

    it('returns empty string if no cookies', () => {
      const result = getToken({ headers: {} });
      expect(result).toEqual('');
    });

    it('returns empty string if no hackney token', () => {
      cookie.parse = cookie.parse.mockReturnValue({});
      const result = getToken({ headers: { cookie: {} } });
      expect(result).toEqual('');
    });

    it('returns token', () => {
      cookie.parse = cookie.parse.mockReturnValue({ hackneyToken: 'TOKEN' });
      const result = getToken({ headers: { cookie: {} } });
      expect(result).toEqual('TOKEN');
    });
  });

  describe('getUsername', () => {
    it('returns name if token contains name', () => {
      jwt.decode.mockReturnValue({ name: 'Matt' });
      const result = getUsername('TOKEN');
      expect(result).toEqual('Matt');
    });

    it('returns falsy if cookie cant be decoded', () => {
      jwt.decode.mockReturnValue();
      const result = getUsername('TOKEN');
      expect(result).toBeFalsy();
    });

    it('returns falsy if no cookie', () => {
      const result = getUsername();
      expect(result).toBeFalsy();
    });
  });

  describe('createToken', () => {
    it('returns a new token', () => {
      jwt.sign.mockReturnValue('abc');
      const result = createToken();
      expect(result).toEqual('abc');
    });
  });
});
