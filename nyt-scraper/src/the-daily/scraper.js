const scraper = require('../scraping-components/PodcastScraper');

const scrape = async() => {

    let params = {
        podcastName: 'The Daily',
        tableName: process.env.EPISODE_TABLE_NAME,
        rssUrl: process.env.THE_DAILY_RSS_URL,
        retrievalWindowInDays: 7,
        startIndex: 0,
        bucketName: process.env.THE_DAILY_BUCKET
    }

    return scraper.scrape(params);

}

module.exports = {
    scrape: scrape
}

