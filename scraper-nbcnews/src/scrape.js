const scraper = require('common-config/src/scraping/PodcastScraper');
const rssParser = require('./scraping-components/PodcastEpisodeRssParser');

const scrape = async (event) => {

    const scrapes = [];

    event.podcasts.forEach(podcast => {
        let params = {
            podcastTitle: podcast.title,
            podcastAuthor: podcast.author,
            dnsName: podcast.dns,
            rssUrl: podcast.rssUrl,
            rssParser: rssParser,
            lookback: 3
        };

        scrapes.push(scraper.scrape(params));
    });

    const results = await Promise.all(scrapes)

    return results;

}

module.exports = scrape;