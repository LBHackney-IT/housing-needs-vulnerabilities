export default class FindSnapshots {
  constructor({ snapshotGateway }) {
    this.snapshotGateway = snapshotGateway;
  }

  async execute(request) {
    return await this.snapshotGateway.find(request);
  }
}
