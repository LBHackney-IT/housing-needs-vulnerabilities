import ArgumentError from './argument-error';

export default class Token {
  constructor({ token, createdDate }) {
    if (!token) throw new ArgumentError('no token');
    this.token = token;
    this.createdDate = createdDate || new Date(Date.now()).toISOString();
  }
}
