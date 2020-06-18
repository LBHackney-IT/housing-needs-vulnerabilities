import ArgumentError from './argument-error';
import { IsoDateTime } from './isodate';

export default class Token {
  constructor({ token, createdDate }) {
    if (!token) throw new ArgumentError('no token');
    this.token = token;
    this.createdDate = createdDate || IsoDateTime.now();
  }
}
