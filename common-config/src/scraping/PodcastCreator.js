const dbDao = require('./PodcastDBDao');
const s3Dao = require('./PodcastS3Dao');

const createPodcast = async (rssFeed, dns) => {
    let savedImage = '';
    let imageKey = `${dns}/${dns}.jpg`

    if (rssFeed.imageUrl) {
        savedImage = await s3Dao.savePodcastImage(rssFeed.imageUrl, imageKey);
    }

    let entryToSave = {
        title: rssFeed.title,
        author: rssFeed.author,
        category: rssFeed.category,
        imageUrl: savedImage.Location,
        imageKey: imageKey 
    }

    let savedPodcast = await dbDao.savePodcast(entryToSave);

    return savedPodcast;
}

const createEpisode = async (podcast, episode, dns) => {

    let mp3Key = `${dns}/${episode.title}.mp3`;

    let savedMp3 = await s3Dao.saveEpisodeMp3(episode.mp3Location, mp3Key);

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
        url: savedMp3.Location,
        mp3Key: mp3Key
    }

    let savedEpisode = await dbDao.saveEpisode(entryToSave);

    return savedEpisode;
}

module.exports = {
    createPodcast,
    createEpisode
}

