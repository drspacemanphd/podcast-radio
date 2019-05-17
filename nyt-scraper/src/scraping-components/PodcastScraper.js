const rssParser = require('./PodcastEpisodeRssParser');
const newEpisodeFilter = require('./NewPodcastEpisodeFilter');
const podcastEpisodeDao = require('./PodcastEpisodeDao');

/**
 * 
 * @param { podcastName (String), tableName(String), rssUrl(String), retrievalWindowInDays(Number), startIndex(Number), bucketName(string)} params
 */
const scrapePodcastForNewEpisodes = async (params) => {

    return new Promise((resolve, reject) => {
        
        let latestRssEntry = rssParser.parse(params);
        let latestEpisodesFromDB = podcastEpisodeDao.getLatestEpisodesFromDB(params);

        Promise.all([latestRssEntry, latestEpisodesFromDB])
            .then(values => {
                return newEpisodeFilter.filter(values[0], values[1].Items, params.podcastName);
            })
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
                console.error(`***** SCRAPE OF ${params.podcastName} FAILED *****`);
                reject(err);
            });

    });

}

module.exports = {
    scrape: scrapePodcastForNewEpisodes
}
