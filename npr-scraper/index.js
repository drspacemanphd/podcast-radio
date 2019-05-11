process.env.NODE_ENV = process.env.AWS_NODE_ENV || 'development';
require('dotenv-flow').config();
const freshAir = require('./src/fresh-air/scraper');
const nprPolitics = require('./src/npr-politics/scraper');

const handler = async (event, context, callback) => {
    if (!process.env.NODE_ENV) throw new Error("***** NO ENVIRONMENT SPECIFIED ****");
    let results = await Promise.all([freshAir.scrape(), nprPolitics.scrape()]);
    return {
        statusCode: 200,
        body: {
            freshAir: JSON.stringify(results[0]),
            nprPolitics: JSON.stringify(results[1])
        }
    }
};

exports.handler = handler;