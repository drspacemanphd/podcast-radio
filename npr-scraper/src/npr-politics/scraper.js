const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    let params = {
        podcastTitle: process.env.NPR_POLITICS_TITLE,
        podcastAuthor: process.env.AUTHOR,
        dnsName: process.env.NPR_POLITICS_DNS,
        rssUrl: process.env.NPR_POLITICS_RSS_URL,
        lookback: 3,
    }

    let result = await scraper.scrape(params);

    return result;

}

module.exports = {
    scrape: scrape
}