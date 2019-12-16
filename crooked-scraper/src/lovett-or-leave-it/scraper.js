const scraper = require('../scraping-components/PodcastScraper');

const scrape = async () => {

    let params = {
        podcastTitle: process.env.LOVETT_OR_LEAVE_IT_TITLE,
        podcastAuthor: process.env.AUTHOR,
        dnsName: process.env.LOVETT_OR_LEAVE_IT_DNS,
        rssUrl: process.env.LOVETT_OR_LEAVE_IT_RSS_URL,
        lookback: 3,
    }

    let result = await scraper.scrape(params);

    return result;

}

module.exports = {
    scrape: scrape
}