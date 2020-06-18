import GetSnapshot from 'lib/use-cases/get-snapshot';
import Snapshot from 'lib/domain/snapshot';

describe('Get Snapshot use case', () => {
  const logger = { info: jest.fn(), error: jest.fn() };

  it('gets a snapshot with id', async () => {
    const id = 1;
    const snapshot = { id };
    const snapshotGateway = {
      get: jest.fn(() => snapshot)
    };

    const getSnapshot = new GetSnapshot({ snapshotGateway, logger });
    const result = await getSnapshot.execute({ id });

    expect(snapshotGateway.get).toHaveBeenCalledWith({ id });
    expect(result).toEqual(snapshot);
  });

  it('returns null if snapshot does not exist', async () => {
    const snapshotGateway = {
      get: jest.fn(() => null)
    };

    const getSnapshot = new GetSnapshot({ snapshotGateway, logger });
    const result = await getSnapshot.execute({ id: 1 });
    expect(result).toEqual(null);
  });
});
