export default class GetSnapshot {
  constructor({ snapshotGateway, logger }) {
    this.snapshotGateway = snapshotGateway;
    this.logger = logger;
  }

  async execute({ id }) {
    const snapshot = await this.snapshotGateway.get({ id });

    if (!snapshot) {
      this.logger.info('No snapshot found', { id });
      return null;
    }

    return snapshot;
  }
}
