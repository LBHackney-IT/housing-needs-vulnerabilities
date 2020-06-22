import SnapshotGateway from 'lib/gateways/snapshot-gateway';
import { ArgumentError, Snapshot } from 'lib/domain';

describe('SnapshotGateway', () => {
  let client;
  const tableName = 'vulnerabilities';

  beforeEach(() => {
    client = {
      put: jest.fn(request => ({
        promise: jest.fn(() => ({ Items: [request.Item] }))
      })),
      query: jest.fn(() => ({ promise: jest.fn() })),
      update: jest.fn(() => ({ promise: jest.fn() }))
    };
  });

  describe('create', () => {
    it('throws an error if firstName is not provided', async () => {
      const snapshotGateway = new SnapshotGateway({ client, tableName });

      await expect(async () => {
        await snapshotGateway.create({ lastName: 'name' });
      }).rejects.toThrow(ArgumentError);

      expect(client.put).not.toHaveBeenCalled();
    });

    it('throws an error if lastName is not provided', async () => {
      const snapshotGateway = new SnapshotGateway({ client });

      await expect(async () => {
        await snapshotGateway.create({ firstName: 'name' });
      }).rejects.toThrow(ArgumentError);

      expect(client.put).not.toHaveBeenCalled();
    });

    it('can create a snapshot', async () => {
      const firstName = 'Trevor';
      const lastName = 'McLevor';

      const expectedRequest = {
        TableName: tableName,
        Item: expect.objectContaining({
          id: expect.any(String),
          firstName,
          lastName,
          queryFirstName: firstName.toLowerCase(),
          queryLastName: lastName.toLowerCase()
        })
      };
      const snapshotGateway = new SnapshotGateway({ client, tableName });

      const result = await snapshotGateway.create({ firstName, lastName });

      expect(client.put).toHaveBeenCalledWith(expectedRequest);
      expect(result).toBeInstanceOf(Snapshot);
      expect(result.id).toStrictEqual(expect.any(String));
      expect(result.id.length).toBe(8);
      expect(result.firstName).toEqual(firstName);
      expect(result.lastName).toEqual(lastName);
    });
  });

  describe('get', () => {
    it('throws an error if id is null', async () => {
      const snapshotGateway = new SnapshotGateway({ client, tableName });

      await expect(async () => {
        await snapshotGateway.get({ id: null });
      }).rejects.toThrow(ArgumentError);
      expect(client.query).not.toHaveBeenCalled();
    });

    it('can get a snapshot', async () => {
      const id = 1;
      const firstName = 'Trevor';
      const lastName = 'McLevor';

      client.query = jest.fn(() => ({
        promise: jest.fn(() => ({ Items: [{ id, firstName, lastName }] }))
      }));
      const expectedRequest = {
        TableName: tableName,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
          ':id': id
        }
      };
      const snapshotGateway = new SnapshotGateway({ client, tableName });

      const result = await snapshotGateway.get({ id });

      expect(client.query).toHaveBeenCalledWith(expectedRequest);
      expect(result).toBeInstanceOf(Snapshot);
      expect(result.id).toEqual(id);
      expect(result.firstName).toEqual(firstName);
      expect(result.lastName).toEqual(lastName);
    });

    it('can return null if snapshot does not exist', async () => {
      client.query = jest.fn(() => ({
        promise: jest.fn(() => ({ Items: [] }))
      }));
      const snapshotGateway = new SnapshotGateway({ client, tableName });

      const result = await snapshotGateway.get({ id: 1 });

      expect(result).toBeNull();
    });
  });

  describe('find', () => {
    it('throws an error if first name is missing', async () => {
      const snapshotGateway = new SnapshotGateway({ client, tableName });

      await expect(async () => {
        await snapshotGateway.find({});
      }).rejects.toThrow('first name cannot be null.');
      expect(client.query).not.toHaveBeenCalled();
    });

    it('throws an error if last name is missing', async () => {
      const snapshotGateway = new SnapshotGateway({ client, tableName });

      await expect(async () => {
        await snapshotGateway.find({ firstName: 'Linda' });
      }).rejects.toThrow('last name cannot be null.');
      expect(client.query).not.toHaveBeenCalled();
    });

    it('can find matching snapshots by name', async () => {
      const firstName = 'Sister';
      const lastName = 'Nancy';
      client.query = jest.fn(() => ({
        promise: jest.fn(() => ({ Items: [{}] }))
      }));
      const snapshotGateway = new SnapshotGateway({ client, tableName });
      const expectedRequest = {
        TableName: tableName,
        IndexName: 'NamesIndex',
        KeyConditionExpression: 'queryLastName = :l and queryFirstName = :f',
        ExpressionAttributeValues: {
          ':f': firstName.toLowerCase(),
          ':l': lastName.toLowerCase()
        }
      };

      const result = await snapshotGateway.find({
        firstName,
        lastName
      });

      expect(client.query).toHaveBeenCalledWith(expectedRequest);
      expect(result.snapshots[0]).toBeInstanceOf(Snapshot);
    });

    it('filters snapshots using system ids', async () => {
      const systemId = 'HH123456';
      client.query.mockImplementation(() => {
        return {
          promise: () =>
            Promise.resolve({
              Items: [{ systemIds: ['xxxxxx'] }, { systemIds: [systemId] }]
            })
        };
      });
      const snapshotGateway = new SnapshotGateway({ client, tableName });

      const result = await snapshotGateway.find({
        firstName: 'Hey',
        lastName: 'Hey',
        systemIds: [systemId]
      });

      expect(result.snapshots.length).toEqual(1);
      expect(result.snapshots[0].systemIds).toEqual([systemId]);
    });

    it('sorts snapshots by date descending', async () => {
      const systemId = 'matching';
      client.query.mockImplementation(() => {
        return {
          promise: () =>
            Promise.resolve({
              Items: [
                {
                  id: 3,
                  systemIds: [systemId],
                  created: '2022-10-20T00:00:00.000Z'
                },
                {
                  id: 4,
                  systemIds: [systemId],
                  created: '2022-10-20T00:15:00.000Z'
                },
                {
                  id: 1,
                  systemIds: [systemId],
                  created: '2022-09-18T00:00:00.000Z'
                },
                {
                  id: 2,
                  systemIds: [systemId],
                  created: '2022-09-19T00:00:00.000Z'
                }
              ]
            })
        };
      });
      const snapshotGateway = new SnapshotGateway({ client, tableName });

      const result = await snapshotGateway.find({
        firstName: 'Hey',
        lastName: 'Hey',
        systemIds: [systemId]
      });

      expect(result.snapshots[0].id).toEqual(4);
      expect(result.snapshots[1].id).toEqual(3);
      expect(result.snapshots[2].id).toEqual(2);
      expect(result.snapshots[3].id).toEqual(1);
    });

    it('returns empty array when no matching snapshots', async () => {
      client.query = jest.fn(() => ({
        promise: jest.fn(() => ({ Items: [] }))
      }));
      const snapshotGateway = new SnapshotGateway({ client, tableName });

      const result = await snapshotGateway.find({
        firstName: 'Janos',
        lastName: 'Manos'
      });

      expect(result).toEqual({ snapshots: [] });
    });
  });

  describe('save', () => {
    it('saves the snapshot', async () => {
      const snapshot = new Snapshot({
        id: 1,
        assets: ['an asset'],
        notes: 'some notes',
        vulnerabilities: ['a vulnerability']
      });
      const expectedRequest = {
        TableName: tableName,
        Key: { id: snapshot.id },
        ConditionExpression: 'attribute_exists(id)',
        UpdateExpression: [
          'set assets = :a',
          'notes = :n',
          'vulnerabilities = :v'
        ].join(', '),
        ExpressionAttributeValues: {
          ':a': snapshot.assets,
          ':n': snapshot.notes,
          ':v': snapshot.vulnerabilities
        },
        ReturnValues: 'UPDATED_NEW'
      };
      const snapshotGateway = new SnapshotGateway({ client, tableName });

      const result = await snapshotGateway.save({ snapshot });

      expect(client.update).toHaveBeenCalledWith(expectedRequest);
      expect(result).toBe(snapshot);
    });

    it('throws an error if snapshot does not exist', async () => {
      client.update.mockImplementationOnce(() => {
        throw new Error();
      });
      const snapshotGateway = new SnapshotGateway({ client, tableName });
      await expect(async () => {
        await snapshotGateway.save({ snapshot: {} });
      }).rejects.toThrow();
    });

    it('throws an error if snapshot is null', async () => {
      const snapshotGateway = new SnapshotGateway({ client, tableName });
      await expect(async () => {
        await snapshotGateway.save({});
      }).rejects.toThrow('snapshot cannot be null.');
      expect(client.update).not.toHaveBeenCalled();
    });
  });
});
