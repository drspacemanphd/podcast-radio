process.env.NODE_ENV = 'development';
require('dotenv-flow').config();

const scraper = require('../../../scraping-components/PodcastScraper');

const scrape = () => {

    let results = [];

    for (let i = 5; i < 10; i++) {

        let params = {
            podcastName: 'The NPR Politics Podcast',
            tableName: process.env.EPISODE_TABLE_NAME,
            rssUrl: process.env.NPR_POLITICS_RSS_URL,
            retrievalWindowInDays: 600,
            startIndex: i,
            bucketName: process.env.NPR_POLITICS_BUCKET
        }

        results.push(scraper.scrape(params));

    }

    Promise.all(results)
        .then(r => r)
        .catch(err => { console.log(err); });

}

scrape();