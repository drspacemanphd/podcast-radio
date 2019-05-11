const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    let params = {
        podcastName: 'Lovett or Leave It',
        tableName: process.env.EPISODE_TABLE_NAME,
        rssUrl: process.env.LOVETT_OR_LEAVE_IT_RSS_URL,
        retrievalWindowInDays: 30,
        startIndex: 0,
        bucketName: process.env.LOVETT_OR_LEAVE_IT_BUCKET
    }

    return scraper.scrape(params);

}

module.exports = {
    scrape: scrape
}