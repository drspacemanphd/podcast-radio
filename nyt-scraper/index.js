process.env.NODE_ENV = process.env.AWS_NODE_ENV || 'development';
require('dotenv-flow').config();
const TheDaily = require('./src/the-daily/scraper');

const handler = async (event, context, callback) => {
    if (!process.env.NODE_ENV) throw new Error("***** NO ENVIRONMENT SPECIFIED ****");
    let result = await TheDaily.scrape(0);
    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
};

exports.handler = handler;