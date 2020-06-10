export default class Snapshot {
  constructor({ id, created, firstName, lastName, systemIds }) {
    this.id = id;
    this.created = created ? created : new Date(Date.now()).toISOString();
    this.firstName = firstName;
    this.lastName = lastName;
    this.systemIds = systemIds || [];
  }
}
