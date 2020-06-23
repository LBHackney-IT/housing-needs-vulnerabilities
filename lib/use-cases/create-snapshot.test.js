import CreateSnapshot from 'lib/use-cases/create-snapshot';

describe('Create Snapshot use case', () => {
  it('creates a new snapshot', async () => {
    const id = 1;
    const createdBy = 'Tina Turner';
    const dob = { day: 10, month: 12, year: 1980 };
    const firstName = 'Bart';
    const lastName = 'Simpson';
    const systemIds = ['xyz'];
    const snapshotGateway = {
      create: jest.fn(() => ({ id, firstName, lastName }))
    };
    const createSnapshot = new CreateSnapshot({ snapshotGateway });

    const result = await createSnapshot.execute({
      createdBy,
      dob,
      firstName,
      lastName,
      systemIds
    });

    expect(snapshotGateway.create).toHaveBeenCalledWith({
      createdBy,
      dob: `${dob.year}-${dob.month}-${dob.day}T00:00:00.000Z`,
      firstName,
      lastName,
      systemIds
    });
    expect(result).toEqual({ id, firstName, lastName });
  });
});
