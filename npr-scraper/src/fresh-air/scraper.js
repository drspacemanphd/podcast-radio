const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    let params = {
        podcastName: 'Fresh Air',
        tableName: process.env.EPISODE_TABLE_NAME,
        rssUrl: process.env.FRESH_AIR_RSS_URL,
        retrievalWindowInDays: 7,
        startIndex: 0,
        bucketName: process.env.FRESH_AIR_BUCKET
    }

    let results = await scraper.scrape(params);

    return results;

}

module.exports = {
    scrape: scrape
}