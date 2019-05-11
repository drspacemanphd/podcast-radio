process.env.NODE_ENV = 'development';
require('dotenv-flow').config();

const scraper = require('../../../scraping-components/PodcastScraper');

const scrape = async () => {

    return new Promise((resolve, reject) => {

        let results = [];

        for (let i = 10; i < 20; i++) {

            let params = {
                podcastName: 'Lovett or Leave It',
                tableName: process.env.EPISODE_TABLE_NAME,
                rssUrl: process.env.LOVETT_OR_LEAVE_IT_RSS_URL,
                retrievalWindowInDays: 600,
                startIndex: i,
                bucketName: process.env.LOVETT_OR_LEAVE_IT_BUCKET
            }

            results.push(scraper.scrape(params));

        }

        Promise.all(results)
            .then(r => resolve(results))
            .catch(err => reject(err));

    });

}

scrape();