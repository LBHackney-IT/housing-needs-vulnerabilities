export default class HttpStatusError extends Error {
  constructor(statusCode) {
    super('Request was not successful');
    this.statusCode = statusCode;
  }
}
