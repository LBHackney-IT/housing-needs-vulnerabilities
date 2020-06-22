import UpdateSnapshot from './update-snapshot';

describe('Update Snapshot use case', () => {
  it('updates a snapshot', async () => {
    const snapshotGateway = { save: jest.fn() };
    const snapshot = { id: 1, assets: [], vulnerabilities: [], notes: '' };
    const updateSnapshot = new UpdateSnapshot({ snapshotGateway });

    await updateSnapshot.execute({ snapshot });

    expect(snapshotGateway.save).toHaveBeenCalledWith({
      snapshot
    });
  });
});
