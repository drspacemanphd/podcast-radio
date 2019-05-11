const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    let params = {
        podcastName: 'Pod Save the World',
        tableName: process.env.EPISODE_TABLE_NAME,
        rssUrl: process.env.POD_SAVE_THE_WORLD_RSS_URL,
        retrievalWindowInDays: 30,
        startIndex: 0,
        bucketName: process.env.POD_SAVE_THE_WORLD_BUCKET
    }

    return scraper.scrape(params);

}

module.exports = {
    scrape: scrape
}