const scraper = require('common-config/src/scraping/PodcastScraper');
const rssParser = require('../scraping-components/PodcastEpisodeRssParser');

const scrape = async () => {

    let params = {
        podcastTitle: process.env.THE_DAILY_TITLE,
        podcastAuthor: process.env.AUTHOR,
        dnsName: process.env.THE_DAILY_DNS,
        rssUrl: process.env.THE_DAILY_RSS_URL,
        rssParser: rssParser,
        lookback: 3,
    }

    let result = await scraper.scrape(params);

    return result;

}

module.exports = {
    scrape: scrape
}