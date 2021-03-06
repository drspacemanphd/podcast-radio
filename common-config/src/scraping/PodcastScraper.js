const dao = require('./PodcastDBDao');
const podcastCreator = require('./PodcastCreator');
const filter = require('./NewEpisodeFilter');

const scrape = async (params) => {

    try {

        // Get podcast entry, latest entries from DB, and latest entries from RSS
        let asyncResults = await getData(params);

        let podcast = asyncResults[0][0];
        let rssFeed = asyncResults[1];
        let savedEpisodes = asyncResults[2];

        let podcastRef;

        // If new podcast, run process to save image in S3 and entry in DB
        if (!podcast) {
            console.log(`***** CREATING PODCAST ${params.podcastTitle} By ${params.podcastAuthor} *****`);
            podcast = await podcastCreator.createPodcast(rssFeed, params.dnsName);
            podcastRef = { title: podcast.title, category: podcast.category };
        } else {
            podcastRef = { title: podcast.TITLE.S, category: podcast.CATEGORY.S };
        }

        let savedEpisodeIds = savedEpisodes.map(e => e.GUID.S);

        // Filter for new episodes
        let newEpisodes = filter.filter(rssFeed.entries, savedEpisodeIds);

        // Save episode mp3's and db entries
        let savedEpsiodes = [];
        newEpisodes.forEach(e => savedEpisodes.push(podcastCreator.createEpisode(podcastRef, e, params.dnsName)));
        await Promise.all(savedEpisodes);

        console.log(`***** SAVED ${newEpisodes.length} EPISODES OF ${podcastRef.title} *****`)

        return newEpisodes;

    } catch (err) {
        console.error(`***** FAILED TO SCRAPE ${params.podcastTitle} By ${params.podcastAuthor} *****`);
        console.error(`***** ERROR DUE TO: ${err} *****`);
        throw err;
    }

}

const getData = async (params) => {
    try {
        const results = await Promise.all(
            [
                dao.getPodcast(params.podcastTitle, params.podcastAuthor),
                params.rssParser.getRssFeed(params.rssUrl, params.lookback),
                dao.getEpisodes(params.podcastTitle, params.lookback),
            ]
        );

        return results;
    } catch (err) {
        console.error(`***** ERROR THROWN WHEN GETTING DATA *****`);
        console.error(`***** ERROR DUE TO: ${err} *****`);
        throw err;
    }
}

module.exports = {
    scrape
}