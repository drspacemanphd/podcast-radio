const getNewEpisodes = (rssEntry, savedEpisodes) => {

    let filteredEpisodes = savedEpisodes.filter((e) => {
        return e.EpisodeId.S === rssEntry.guid;
    });

    return filteredEpisodes.length === 0 ? rssEntry : null;

}

module.exports = {
    filter: getNewEpisodes
}