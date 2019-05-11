const PodcastEpisodeBuilder = require('common-config/src/common-model/PodcastEpisode');
const moment = require('moment');

const getNewEpisodes = (rssEntry, savedEpisodes, podcastName) => {

    let filteredEpisodes = savedEpisodes.filter((e) => {
        return e.EpisodeId.S === rssEntry[0].guid[0];
    });

    let hours = Math.floor((rssEntry[0]['itunes:duration'][0]) / 3600);
    let minutes = Math.floor(rssEntry[0]['itunes:duration'][0] / 60) - (hours * 60);
    let seconds = Math.floor(rssEntry[0]['itunes:duration'][0]) - (hours * 3600) - (minutes * 60);

    if (filteredEpisodes.length === 0) {
        return new PodcastEpisodeBuilder()
            .episodeId(rssEntry[0].guid[0])
            .title(rssEntry[0].title[0])
            .podcast(podcastName)
            .publicationDate(moment(rssEntry[0].pubDate[0]).format('YYYY-MM-DD'))
            .downloads('0')
            .link(rssEntry[0].enclosure[0]['$'].url)
            .duration(hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0'))
            .build();
    } else return null;

}

module.exports = {
    filter: getNewEpisodes
}