process.env.NODE_ENV = process.env.AWS_NODE_ENV || 'development';
require('dotenv-flow').config();
const podSaveAmerica = require('./src/pod-save-america/scraper');
const podSaveTheWorld = require('./src/pod-save-the-world/scraper');

const handler = async (event, context, callback) => {
    if (!process.env.NODE_ENV) throw new Error("***** NO ENVIRONMENT SPECIFIED ****");
    let results = await Promise.all([podSaveAmerica.scrape(), podSaveTheWorld.scrape()]);
    return {
        statusCode: 200,
        body: {
            podSaveAmerica: JSON.stringify(results[0]),
            podSaveTheWorld: JSON.stringify(results[1])
        }
    }
};

exports.handler = handler;