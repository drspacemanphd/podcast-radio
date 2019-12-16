const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    let params = {
        podcastTitle: process.env.CALIPHATE_TITLE,
        podcastAuthor: process.env.AUTHOR,
        dnsName: process.env.CALIPHATE_DNS,
        rssUrl: process.env.CALIPHATE_RSS_URL,
        lookback: 13,
    }

    let result = await scraper.scrape(params);

    return result;

}

module.exports = {
    scrape: scrape
}