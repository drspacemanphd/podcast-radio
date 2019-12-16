const dbDao = require('./PodcastDBDao');
const s3Dao = require('./PodcastS3Dao');

const createPodcast = async (rssFeed, dns) => {
    let savedImage = '';
    if (rssFeed.imageUrl) {
        savedImage = await s3Dao.savePodcastImage(rssFeed.imageUrl, dns);
    }

    let entryToSave = {
        title: rssFeed.title,
        author: rssFeed.author,
        category: rssFeed.category,
        imageUrl: savedImage.Location
    }

    let savedPodcast = await dbDao.savePodcast(entryToSave);

    return savedPodcast;
}

const createEpisode = async (podcast, episode, dns) => {
    let savedMp3 = await s3Dao.saveEpisodeMp3(episode.mp3Location, dns, episode.title);

    let entryToSave = {
        guid: episode.guid,
        title: episode.title,
        podcast: podcast.title,
        author: episode.author,
        description: episode.description,
        pubDate: episode.pubDate,
        duration: episode.duration,
        category: podcast.category,
        downloads: '0',
        url: savedMp3.Location
    }

    let savedEpisode = await dbDao.saveEpisode(entryToSave);

    return savedEpisode;
}

module.exports = {
    createPodcast,
    createEpisode
}

