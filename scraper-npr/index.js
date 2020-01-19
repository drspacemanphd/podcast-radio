process.env.NODE_ENV = process.env.AWS_NODE_ENV || 'development';
require('dotenv-flow').config();
const scrape = require('./src/scrape');

const handler = async (event, context, callback) => {
    if (!process.env.NODE_ENV) throw new Error("***** NO ENVIRONMENT SPECIFIED ****");
    const results = await scrape(event);

    return {
        statusCode: 200,
        body: results
    }
};

exports.handler = handler;