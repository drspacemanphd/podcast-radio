process.env.NODE_ENV = process.env.AWS_NODE_ENV || 'development';
require('dotenv-flow').config();
const TheDaily = require('./src/the-daily/scraper');
const Caliphate = require('./src/caliphate/scraper');

const handler = async (event, context, callback) => {
    if (!process.env.NODE_ENV) throw new Error("***** NO ENVIRONMENT SPECIFIED ****");
    let results = await Promise.all([TheDaily.scrape(0), Caliphate.scrape(0)]);
    return {
        statusCode: 200,
        body: {
            TheDaily: JSON.stringify(results[0]),
            Caliphate: JSON.stringify(results[1])
        }
    }
};

exports.handler = handler;