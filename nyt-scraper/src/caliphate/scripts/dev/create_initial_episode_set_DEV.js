require('dotenv-flow').config({
    node_env: 'development'
});
const scraper = require('../../scraper');

const loadInitialEpisodes = async () => {
    for (let i = 10; i < 11; i++) {
        await scraper.scrape(i);
    }
    console.log("SUCCESS");
    return;
}

loadInitialEpisodes();