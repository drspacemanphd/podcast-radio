export default function (podcastTitle, episodeId) {
    return {
        type: 'UPDATE_CURRENT_EPISODE',
        currentPodcastTitle: podcastTitle,
        currentEpisodeId: episodeId
    }
}