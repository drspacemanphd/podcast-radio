process.env.NODE_ENV = process.env.AWS_NODE_ENV || 'development';
require('dotenv-flow').config();

const awsServerlessExpress = require('aws-serverless-express')
const app = require('./src/App')
const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }