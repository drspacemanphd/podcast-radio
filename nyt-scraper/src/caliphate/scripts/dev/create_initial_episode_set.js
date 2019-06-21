process.env.NODE_ENV = 'development';
require('dotenv-flow').config();

const scraper = require('../../../scraping-components/PodcastScraper');

const scrape = () => {

    let results = [];

    for (let i = 0; i < 15; i++) {

        let params = {
            podcastName: process.env.CALIPHATE_NAME,
            tableName: process.env.EPISODE_TABLE_NAME,
            rssUrl: process.env.CALIPHATE_RSS_URL,
            retrievalWindowInDays: 1000,
            startIndex: i,
            bucketName: process.env.S3_BUCKET,
            keyPrefix: process.env.CALIPHATE_KEY_PREFIX
        }

        results.push(scraper.scrape(params));

    }

    Promise.all(results)
        .then(r => r)
        .catch(err => { console.log(err); });

}

scrape();