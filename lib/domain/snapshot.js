import { IsoDateTime } from './isodate';

export default class Snapshot {
  constructor({
    id,
    created,
    createdBy,
    firstName,
    lastName,
    dob,
    systemIds,
    assets,
    notes,
    vulnerabilities
  }) {
    this.id = id;
    this.created = created ? created : IsoDateTime.now();
    this.createdBy = createdBy;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    this.systemIds = systemIds || [];
    this.assets = assets || [];
    this.notes = notes || '';
    this.vulnerabilities = vulnerabilities || [];
  }
}
