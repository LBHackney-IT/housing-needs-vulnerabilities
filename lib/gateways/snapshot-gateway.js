import { nanoid } from 'nanoid';
import { ArgumentError, Snapshot } from 'lib/domain';
import { createSnapshotModel, createSnapshotFromModel } from './models';

class SnapshotGateway {
  constructor({ client, tableName }) {
    this.client = client;
    this.tableName = tableName;
  }

  async create({ firstName, lastName, systemIds }) {
    if (!firstName) throw new ArgumentError('first name cannot be null.');
    if (!lastName) throw new ArgumentError('last name cannot be null.');

    const snapshot = new Snapshot({
      id: nanoid(8),
      firstName,
      lastName,
      systemIds: systemIds
    });

    const request = {
      TableName: this.tableName,
      Item: createSnapshotModel(snapshot)
    };

    await this.client.put(request).promise();
    return snapshot;
  }

  async get({ id }) {
    if (!id) throw new ArgumentError('id cannot be null.');

    const request = {
      TableName: this.tableName,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id
      }
    };

    const result = await this.client.query(request).promise();
    if (result.Items.length === 0) return null;
    return createSnapshotFromModel(result.Items[0]);
  }

  async find({ firstName, lastName, systemIds }) {
    if (!firstName) throw new ArgumentError('first name cannot be null.');
    if (!lastName) throw new ArgumentError('last name cannot be null.');

    const request = {
      TableName: this.tableName,
      IndexName: 'NamesIndex',
      KeyConditionExpression: 'queryLastName = :l and queryFirstName = :f',
      ExpressionAttributeValues: {
        ':l': lastName.toLowerCase(),
        ':f': firstName.toLowerCase()
      }
    };

    const { Items } = await this.client.query(request).promise();

    const snapshots = await Promise.all(
      Items.filter(s => {
        if (!s.systemIds || s.systemIds.length === 0) {
          return true;
        }
        return s.systemIds.some(id => systemIds.includes(id));
      })
        .map(s => createSnapshotFromModel(s))
        .sort((s1, s2) => (s1.created < s2.created ? 1 : -1))
    );
    return { snapshots };
  }
}

export default SnapshotGateway;
