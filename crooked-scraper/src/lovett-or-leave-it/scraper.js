const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    let params = {
        podcastName: process.env.LOVETT_OR_LEAVE_IT_NAME,
        tableName: process.env.EPISODE_TABLE_NAME,
        rssUrl: process.env.LOVETT_OR_LEAVE_IT_RSS_URL,
        retrievalWindowInDays: 30,
        startIndex: 0,
        bucketName: process.env.LOVETT_OR_LEAVE_IT_BUCKET
    }

    let result = await scraper.scrape(params);

    return result;

}

module.exports = {
    scrape: scrape
}