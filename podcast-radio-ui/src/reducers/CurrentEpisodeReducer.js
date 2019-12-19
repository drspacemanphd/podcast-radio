const initialState = {
    currentPodcastTitle: null,
    currentEpisodeId: null
}

export default function(state = initialState, action) {

    switch (action.type) {

        case 'UPDATE_CURRENT_EPISODE':
            return Object.assign({}, state, {
                currentPodcastTitle: action.currentPodcastTitle,
                currentEpisodeId: action.currentEpisodeId
            });

        default: {
            return state;
        }
        
    }
}