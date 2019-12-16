const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    let params = {
        podcastTitle: process.env.FRESH_AIR_TITLE,
        podcastAuthor: process.env.AUTHOR,
        dnsName: process.env.FRESH_AIR_DNS,
        rssUrl: process.env.FRESH_AIR_RSS_URL,
        lookback: 3,
    }

    let result = await scraper.scrape(params);

    return result;

}

module.exports = {
    scrape: scrape
}