process.env.NODE_ENV = 'development';
require('dotenv-flow').config();

const scraper = require('../../../scraping-components/PodcastScraper');

const scrape = () => {

    let results = [];

    for (let i = 0; i < 2; i++) {

        let params = {
            podcastName: process.env.FRESH_AIR_NAME,
            tableName: process.env.EPISODE_TABLE_NAME,
            rssUrl: process.env.FRESH_AIR_RSS_URL,
            retrievalWindowInDays: 600,
            startIndex: i,
            bucketName: process.env.FRESH_AIR_BUCKET
        }

        results.push(scraper.scrape(params));

    }

    Promise.all(results)
        .then(r => r)
        .catch(err => { console.log(err); });

}

scrape();