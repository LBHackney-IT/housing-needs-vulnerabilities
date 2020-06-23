import { IsoDateTime } from './isodate';

export default class Snapshot {
  constructor({
    id,
    created,
    createdBy,
    dob,
    firstName,
    lastName,
    systemIds,
    assets,
    notes,
    vulnerabilities
  }) {
    this.id = id;
    this.created = created ? created : IsoDateTime.now();
    this.createdBy = createdBy;
    this.dob = dob;
    this.firstName = firstName;
    this.lastName = lastName;
    this.systemIds = systemIds || [];
    this.assets = assets || [];
    this.notes = notes || '';
    this.vulnerabilities = vulnerabilities || [];
  }
}
