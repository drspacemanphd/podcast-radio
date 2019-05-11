const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    let params = {
        podcastName: 'Pod Save America',
        tableName: process.env.EPISODE_TABLE_NAME,
        rssUrl: process.env.POD_SAVE_AMERICA_RSS_URL,
        retrievalWindowInDays: 7,
        startIndex: 0,
        bucketName: process.env.POD_SAVE_AMERICA_BUCKET
    }

    return scraper.scrape(params);

}

module.exports = {
    scrape: scrape
}