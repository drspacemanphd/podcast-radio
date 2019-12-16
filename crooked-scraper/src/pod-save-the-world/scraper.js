const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    let params = {
        podcastTitle: process.env.POD_SAVE_THE_WORLD_TITLE,
        podcastAuthor: process.env.AUTHOR,
        dnsName: process.env.POD_SAVE_THE_WORLD_DNS,
        rssUrl: process.env.POD_SAVE_THE_WORLD_RSS_URL,
        lookback: 3,
    }

    let result = await scraper.scrape(params);

    return result;

}

module.exports = {
    scrape: scrape
}