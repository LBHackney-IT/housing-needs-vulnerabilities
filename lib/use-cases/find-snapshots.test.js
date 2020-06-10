import FindSnapshots from 'lib/use-cases/find-snapshots';

describe('Find Snapshots use case', () => {
  it('can find matching snapshots', async () => {
    const snapshotGateway = { find: jest.fn() };
    const findSnapshots = new FindSnapshots({ snapshotGateway });

    const findSnapshotsRequest = {
      firstName: 'Joe',
      lastName: 'Bro',
      systemIds: ['123']
    };

    await findSnapshots.execute(findSnapshotsRequest);
    expect(snapshotGateway.find).toHaveBeenCalledWith(findSnapshotsRequest);
  });
});
