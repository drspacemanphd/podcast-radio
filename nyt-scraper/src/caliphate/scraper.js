const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    const params = {
        podcastName: process.env.CALIPHATE_NAME,
        tableName: process.env.EPISODE_TABLE_NAME,
        rssUrl: process.env.CALIPHATE_RSS_URL,
        retrievalWindowInDays: 1000,
        startIndex: 0,
        bucketName: process.env.S3_BUCKET,
        keyPrefix: process.env.CALIPHATE_KEY_PREFIX
    }

    let results = await scraper.scrape(params);

    return results;

}

module.exports = {
    scrape: scrape
}

