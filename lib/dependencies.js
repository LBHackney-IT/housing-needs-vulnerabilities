import SnapshotGateway from './gateways/snapshot-gateway';
import CreateSnapshot from './use-cases/create-snapshot';
import FindSnapshots from './use-cases/find-snapshots';
import GetSnapshot from './use-cases/get-snapshot';
import { logger, withLogging } from './infrastructure/logging';
import AWS from 'aws-sdk';

const dbConfig = {};
if (process.env.ENV !== 'production' && process.env.ENV !== 'staging') {
  dbConfig.region = 'localhost';
  dbConfig.endpoint = 'http://localhost:8000';
  dbConfig.accessKeyId = 'foo';
  dbConfig.secretAccessKey = 'bar';
}

const snapshotGateway = new SnapshotGateway({
  client: new AWS.DynamoDB.DocumentClient(dbConfig),
  tableName: process.env.VULNERABILITIES_TABLE_NAME
});

const createSnapshot = withLogging(
  new CreateSnapshot({ snapshotGateway }),
  logger
);
const findSnapshots = withLogging(
  new FindSnapshots({ snapshotGateway }),
  logger
);
const getSnapshot = withLogging(new GetSnapshot({ snapshotGateway }), logger);

export { createSnapshot, findSnapshots, getSnapshot };
