export default class CreateSnapshot {
  constructor({ snapshotGateway }) {
    this.snapshotGateway = snapshotGateway;
  }

  async execute({ firstName, lastName, systemIds }) {
    const snapshot = await this.snapshotGateway.create({
      firstName,
      lastName,
      systemIds
    });

    return {
      id: snapshot.id,
      firstName: snapshot.firstName,
      lastName: snapshot.lastName
    };
  }
}
