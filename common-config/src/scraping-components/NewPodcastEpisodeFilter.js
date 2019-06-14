const PodcastEpisodeBuilder = require('../common-model/PodcastEpisode');

const getNewEpisodes = (rssEntry, savedEpisodes) => {

    let filteredEpisodes = savedEpisodes.filter((e) => {
        return e.EpisodeId.S === rssEntry.guid;
    });

    if (filteredEpisodes.length === 0) {
        return new PodcastEpisodeBuilder()
            .episodeId(rssEntry.guid)
            .title(rssEntry.title)
            .podcast(rssEntry.podcast)
            .publicationDate(rssEntry.publicationDate)
            .downloads('0')
            .link(rssEntry.link)
            .duration(rssEntry.duration)
            .build();
    } else return null;

}

module.exports = {
    filter: getNewEpisodes
}