const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    const params = {
        podcastName: process.env.CALIPHATE_NAME,
        tableName: process.env.EPISODE_TABLE_NAME,
        rssUrl: process.env.CALIPHATE_RSS_URL,
        retrievalWindowInDays: 600,
        startIndex: 0,
        bucketName: process.env.CALIPHATE_BUCKET
    }

    let results = await scraper.scrape(params);

    return results;

}

module.exports = {
    scrape: scrape
}

