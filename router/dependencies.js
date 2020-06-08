const DbGateway = require('./gateways/db-gateway');
const CheckAuth = require('./use-cases/check-auth');
const CheckCustomerToken = require('./use-cases/check-customer-token');
const AWS = require('aws-sdk');

const dbConfig = {};
if (process.env.ENV !== 'production' && process.env.ENV !== 'staging') {
  dbConfig.region = 'localhost';
  dbConfig.endpoint = 'http://localhost:8000';
  dbConfig.accessKeyId = 'foo';
  dbConfig.secretAccessKey = 'bar';
}

const dbGateway = new DbGateway({
  client: new AWS.DynamoDB.DocumentClient(dbConfig),
  tableName: process.env.PLANS_TABLE_NAME
});

const checkCustomerToken = new CheckCustomerToken({ dbGateway });
const checkAuth = new CheckAuth({
  allowedGroups: process.env.ALLOWED_GROUPS.split(',')
});

module.exports = { checkAuth, checkCustomerToken };
