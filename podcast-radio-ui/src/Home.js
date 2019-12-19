import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import PodcastListView from './views/PodcastListView';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import views from './navigation/NavigationConfiguration';
import { Storage, API } from 'aws-amplify';
import createAudioObject from './audio/AudioObjectFactory';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.audioObject = null;
        this.handleCurrentEpisodeChange = this.handleCurrentEpisodeChange.bind(this);
        this.state = {
            podcasts: [],
            hasLoaded: false,
            currentEpisode: {}
        }
    }

    static navigationOptions = {
        title: 'Podcast Radio',
        headerStyle: {
            backgroundColor: '#00356B',
        },
        headerTitleStyle: {
            color: 'white',
            fontFamily: 'sans-serif-thin'
        }
    }

    async componentDidMount() {
        try {
            let podcasts;
            await Promise.all([
                (async () => { podcasts = await this._getPodcasts(); })(),
                (async () => { this.audioObject = await createAudioObject(); })()
            ]);
            this.setState({
                podcasts: podcasts,
                hasLoaded: true
            });
        } catch (err) {
            console.log(`ERROR WHEN GETTING PODCASTS`);
            console.log(`ERROR DUE TO ${err}`);
        }
    }

    handleCurrentEpisodeChange(podcastId, episodeId) {
        this.setState({
            currentEpisode: {
                podcastId: podcastId,
                episodeId: episodeId
            }
        });
    }

    render() {
        if (!this.state.hasLoaded) {
            return <ActivityIndicator size={100} color='#00356B' style={styles.loader} />
        } else {
            return (
                <View style={styles.container}>
                    <PodcastListView 
                        audioObject={this.audioObject}
                        podcasts={this.state.podcasts}
                        navigation={this.props.navigation}
                        currentEpisode={this.state.currentEpisode}
                        handleCurrentEpisodeChange={this.handleCurrentEpisodeChange}
                    />
                </View>
            );
        }
    }

    async _getPodcasts() {
        try {
            let signedUrls = [];
            let apiResult = await API.get("podcast-api-DEV", "/podcast/all");
            let podcasts = apiResult.payload;

            podcasts.forEach(p => signedUrls.push(Storage.get(p.IMAGE_KEY)));
            let urls = await Promise.all(signedUrls);

            for (let i = 0; i < urls.length; i++) {
                podcasts[i].IMAGE_URL = urls[i];
            }

            return podcasts;
        } catch (err) {
            console.log(`ERROR WHEN GETTING PODCASTS`);
            console.log(`ERROR DUE TO ${err}`);  
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#fffcf4',
    },
    headerContainerStyle: {
        backgroundColor: '#003366'
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const appStack = () => {
    views.Home = Home;
    return createStackNavigator(views,
        {
            initialRouteName: 'Home',
            headerLayoutPreset: 'center'
        }
    );
};

export default createAppContainer(appStack());