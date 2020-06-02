import VulnGateway from './gateways/vuln-gateway';
import { logger, withLogging } from './infrastructure/logging';
import AWS from 'aws-sdk';

const dbConfig = {};
if (process.env.ENV !== 'production' && process.env.ENV !== 'staging') {
  dbConfig.region = 'localhost';
  dbConfig.endpoint = 'http://localhost:8000';
  dbConfig.accessKeyId = 'foo';
  dbConfig.secretAccessKey = 'bar';
}

const vulnGateway = new VulnGateway({
  client: new AWS.DynamoDB.DocumentClient(dbConfig),
  tableName: process.env.VULNS_TABLE_NAME
});

//const addVuln = withLogging(new AddVuln({ vulnGateway }), logger);

export {};
