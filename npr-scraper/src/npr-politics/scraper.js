const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    let params = {
        podcastName: 'The NPR Politics Podcast',
        tableName: process.env.EPISODE_TABLE_NAME,
        rssUrl: process.env.NPR_POLITICS_RSS_URL,
        retrievalWindowInDays: 30,
        startIndex: 0,
        bucketName: process.env.NPR_POLITICS_BUCKET
    }

    return scraper.scrape(params);

}

module.exports = {
    scrape: scrape
}