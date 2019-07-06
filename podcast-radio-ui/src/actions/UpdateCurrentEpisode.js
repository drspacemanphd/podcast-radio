export default function(podcastId, episodeId) {
    return {
        type: 'UPDATE_CURRENT_EPISODE',
        currentPodcastId: podcastId,
        currentEpisodeId: episodeId
    }
}