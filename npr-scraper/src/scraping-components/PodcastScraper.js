const rssParser = require('./PodcastEpisodeRssParser');
const newEpisodeFilter = require('common-config/src/scraping-components/NewPodcastEpisodeFilter');
const podcastEpisodeDao = require('common-config/src/scraping-components/PodcastEpisodeDao');

/**
 * 
 * @param { podcastName (String), tableName(String), rssUrl(String), retrievalWindowInDays(Number), startIndex(Number), bucketName(String)} params
 */
const scrapePodcastForNewEpisodes = (params) => {

    return new Promise((resolve, reject) => {
        
        let latestRssEntry = rssParser.parse(params);
        let latestEpisodesFromDB = podcastEpisodeDao.getLatestEpisodesFromDB(params);

        Promise.all([latestRssEntry, latestEpisodesFromDB])
            .then(values => newEpisodeFilter.filter(values[0], values[1].Items))
            .then(episode => {
                if (episode) return podcastEpisodeDao.saveNewEpisode(episode, params);
                else {
                    console.log(`***** NO NEW EPISODES OF ${params.podcastName} *****`);
                    resolve(null);
                }
            })
            .then(episode => {
                resolve(episode);
            })
            .catch((err) => {
                console.error(`***** SCRAPE OF ${params.podcastName} FAILED *****`)
                reject(err);
            });

    });

}

module.exports = {
    scrape: scrapePodcastForNewEpisodes
}
