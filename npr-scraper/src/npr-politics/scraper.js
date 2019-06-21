const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    let params = {
        podcastName: process.env.NPR_POLITICS_NAME,
        tableName: process.env.EPISODE_TABLE_NAME,
        rssUrl: process.env.NPR_POLITICS_RSS_URL,
        retrievalWindowInDays: 600,
        startIndex: 0,
        bucketName: process.env.S3_BUCKET,
        keyPrefix: process.env.NPR_POLITICS_KEY_PREFIX
    }

    let results = await scraper.scrape(params);

    return results;

}

module.exports = {
    scrape: scrape
}