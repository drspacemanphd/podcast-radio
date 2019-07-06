const initialState = {
    currentPodcastId: null,
    currentEpisodeId: null
}

export default function(state = initialState, action) {

    switch (action.type) {

        case 'UPDATE_CURRENT_EPISODE':
            return Object.assign({}, state, {
                currentPodcastId: action.currentPodcastId,
                currentEpisodeId: action.currentEpisodeId
            });

        default: {
            return state;
        }
        
    }
}