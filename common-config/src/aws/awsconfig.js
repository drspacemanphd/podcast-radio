const aws = require('aws-sdk');

const s3 = (() => new aws.S3({ region: process.env.S3_REGION }))();
const db = (() => new aws.DynamoDB({ region: process.env.DYNAMO_DB_REGION }))();

module.exports = {
    s3,
    db 
}