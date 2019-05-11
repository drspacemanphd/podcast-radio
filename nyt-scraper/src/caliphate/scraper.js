const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    const params = {
        podcastName: 'Caliphate',
        tableName: process.env.EPISODE_TABLE_NAME,
        rssUrl: process.env.CALIPHATE_RSS_URL,
        retrievalWindowInDays: 600,
        startIndex: 0,
        bucketName: process.env.CALIPHATE_BUCKET
    }

    return scraper.scrape(params);

}

module.exports = {
    scrape: scrape
}

