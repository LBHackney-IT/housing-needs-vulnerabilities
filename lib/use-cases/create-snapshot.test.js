import CreateSnapshot from 'lib/use-cases/create-snapshot';

describe('Create Snapshot use case', () => {
  it('creates a new snapshot', async () => {
    const id = 1;
    const firstName = 'Bart';
    const lastName = 'Simpson';
    const systemIds = ['xyz'];
    const snapshotGateway = {
      create: jest.fn(() => ({ id, firstName, lastName }))
    };
    const createSnapshot = new CreateSnapshot({ snapshotGateway });

    const result = await createSnapshot.execute({
      firstName,
      lastName,
      systemIds
    });

    expect(snapshotGateway.create).toHaveBeenCalledWith({
      firstName,
      lastName,
      systemIds
    });
    expect(result).toEqual({ id, firstName, lastName });
  });
});
