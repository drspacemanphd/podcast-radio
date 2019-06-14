const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    let params = {
        podcastName: process.env.POD_SAVE_THE_WORLD_NAME,
        tableName: process.env.EPISODE_TABLE_NAME,
        rssUrl: process.env.POD_SAVE_THE_WORLD_RSS_URL,
        retrievalWindowInDays: 30,
        startIndex: 0,
        bucketName: process.env.POD_SAVE_THE_WORLD_BUCKET
    }

    let result = await scraper.scrape(params);

    return result;

}

module.exports = {
    scrape: scrape
}