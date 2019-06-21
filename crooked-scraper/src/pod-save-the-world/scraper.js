const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    let params = {
        podcastName: process.env.POD_SAVE_THE_WORLD_NAME,
        tableName: process.env.EPISODE_TABLE_NAME,
        rssUrl: process.env.POD_SAVE_THE_WORLD_RSS_URL,
        retrievalWindowInDays: 600,
        startIndex: 0,
        bucketName: process.env.S3_BUCKET,
        keyPrefix: process.env.POD_SAVE_THE_WORLD_KEY_PREFIX
    }

    let result = await scraper.scrape(params);

    return result;

}

module.exports = {
    scrape: scrape
}