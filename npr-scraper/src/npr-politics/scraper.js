const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    let params = {
        podcastName: process.env.NPR_POLITICS_NAME,
        tableName: process.env.EPISODE_TABLE_NAME,
        rssUrl: process.env.NPR_POLITICS_RSS_URL,
        retrievalWindowInDays: 30,
        startIndex: 0,
        bucketName: process.env.NPR_POLITICS_BUCKET
    }

    let results = await scraper.scrape(params);

    return results;

}

module.exports = {
    scrape: scrape
}