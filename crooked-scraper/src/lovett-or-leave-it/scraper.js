const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    let params = {
        podcastName: process.env.LOVETT_OR_LEAVE_IT_NAME,
        tableName: process.env.EPISODE_TABLE_NAME,
        rssUrl: process.env.LOVETT_OR_LEAVE_IT_RSS_URL,
        retrievalWindowInDays: 600,
        startIndex: 0,
        bucketName: process.env.S3_BUCKET,
        keyPrefix: process.env.LOVETT_OR_LEAVE_IT_KEY_PREFIX
    }

    let result = await scraper.scrape(params);

    return result;

}

module.exports = {
    scrape: scrape
}