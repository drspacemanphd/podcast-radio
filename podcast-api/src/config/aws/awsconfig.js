const aws = require('aws-sdk');

const dbClient = (() => new aws.DynamoDB.DocumentClient({ region: process.env.DYNAMO_DB_REGION }))();

module.exports = {
    dbClient
}