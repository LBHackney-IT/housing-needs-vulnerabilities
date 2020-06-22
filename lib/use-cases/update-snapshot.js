export default class UpdateSnapshot {
  constructor({ snapshotGateway }) {
    this.snapshotGateway = snapshotGateway;
  }

  async execute({ snapshot }) {
    await this.snapshotGateway.save({ snapshot });
  }
}
