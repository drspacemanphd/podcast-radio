import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Icon, Overlay, Slider } from 'react-native-elements';
import { Storage } from 'aws-amplify';
import { connect } from 'react-redux';
import moment from 'moment';

import actions from '../actions/index';

class EpisodeView extends React.Component {
    constructor(props) {
        super(props);
        this.episode = this.props.navigation.getParam('episode');
        this.podcast = this.props.navigation.getParam('podcast');
        this.soundObject = this.props.navigation.getParam('audioObject');
        this.state = {
            isEpisodeLoading: false,
            isEpisodePlaying: false,
            currentPositionMillis: 0
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('episode').TITLE,
            headerStyle: {
                backgroundColor: '#00356B',
            },
            headerTitleStyle: {
                color: 'white',
                fontFamily: 'sans-serif-thin'
            },
            headerTintColor: 'white'
        }
    }

    async componentDidMount() {
        if (this._isEpisodeAlreadyLoaded()) await this._loadCurrentEpisodeState();
    }

    componentWillUnmount() {
        this.soundObject.setOnPlaybackStatusUpdate(function () {});
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderOverlay()}
                <Image
                    source={{ uri: this.podcast.IMAGE_URL }}
                    style={styles.image}
                />
                <Text style={styles.title}>{this.episode.TITLE}</Text>
                <Icon
                    name={this.state.isEpisodePlaying ? 'pause' : 'play'}
                    type='font-awesome'
                    onPress={() => this._togglePlay()}
                    size={40}
                    color={this.state.isEpisodeLoading ? 'gray' : 'black'}
                    disabled={this.state.isEpisodeLoading}
                    disabledStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
                />
                <Slider
                    animationType='timing'
                    disabled={!this._isEpisodeAlreadyLoaded()}
                    value={this.state.currentPositionMillis}
                    minimumValue={0}
                    maximumValue={(() => moment.duration(this.episode.DURATION).asMilliseconds())()}
                    style={{width: '80%', marginTop: 10}}
                    thumbStyle={this._isEpisodeAlreadyLoaded() ? { backgroundColor: '#00356B' } : { backgroundColor: 'rgba(100,100,100,1)' }}
                    onSlidingStart={async () => await this.soundObject.pauseAsync()}
                    onValueChange={async (value) => {
                        await this.soundObject.setPositionAsync(value);
                        await this.setState({
                            currentPositionMillis: value
                        });
                    }}
                    onSlidingComplete={async () => {
                        if (this.state.isEpisodePlaying) await this.soundObject.playFromPositionAsync(this.state.currentPositionMillis);
                    }}
                />
            </View>
        );
    }

    _isEpisodeAlreadyLoaded() {
        return this.podcast.TITLE === this.props.currentPodcastTitle &&
            this.episode.GUID === this.props.currentEpisodeId;
    }

    async _loadCurrentEpisodeState() {
        let currentSoundStatus = await this.soundObject.getStatusAsync();
        this.setState({
            isEpisodeLoading: false,
            isEpisodePlaying: currentSoundStatus.isPlaying,
            currentPositionMillis: currentSoundStatus.positionMillis
        });
    }

    async _loadNewEpisode() {
        
        let me = this;

        const isAnEpisodeAlreadyLoaded = async () => {
            let status = await me.soundObject.getStatusAsync();
            return status.isLoaded;
        }

        try {

            let isLoaded = await isAnEpisodeAlreadyLoaded();
            if (isLoaded) await this.soundObject.stopAsync();
            if (isLoaded) await this.soundObject.unloadAsync();

            let episodeUrl = await Storage.get(this.episode.MP3_KEY);

            await this.soundObject.loadAsync(
                { uri: episodeUrl },
                { progressUpdateIntervalMillis: 1000 }
            );

            await this.soundObject.setOnPlaybackStatusUpdate(playbackStatus => {
                if (me.state.isEpisodePlaying) {
                    me.setState({
                        currentPositionMillis: playbackStatus.positionMillis
                    });
                }
                if (playbackStatus.didJustFinish) {
                    this.soundObject.setStatusAsync({
                        shouldPlay: false,
                        positionMillis: 0
                    });
                    me.setState({
                        isEpisodePlaying: false,
                        currentPositionMillis: 0
                    });
                }
            });

            this.setState({
                isEpisodeLoading: false,
            });

        } catch (err) {

            console.log(`ERROR WHEN SETTING UP AUDIO`);
            console.log(`ERROR DUE TO ${err}`);
            throw err; 

        }

    }

    _renderOverlay() {
        return (
            <Overlay 
                overlayBackgroundColor='rgba(255, 255, 255, 0.5)'
                overlayStyle={{ height: '100%', width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
                isVisible={this.state.isEpisodeLoading}
            >
                <ActivityIndicator size={40} color='rgba(0, 21, 42, 0.5)' isVisible={this.state.isEpisodeLoading} borderBottomWidth={5}/>
            </Overlay>
        )
    }

    async _togglePlay() {
        if (!this._isEpisodeAlreadyLoaded()) {
            this.props.updateCurrentEpisode(this.podcast.TITLE, this.episode.GUID);
            await this.setState({
                isEpisodeLoading: true,
                isEpisodePlaying: false,
                currentPositionMillis: 0
            });
            await this._loadNewEpisode();
        }
        if (!this.state.isEpisodePlaying) {
            this.soundObject.playAsync()
                .then(() => {
                    this.setState({
                        isEpisodePlaying: true
                    });
                })
                .catch(err => {
                    console.log(`ERROR OCCURRED WHEN PLAYING ${this.episode.TITLE}`);
                    console.log(`ERROR DUE TO: ${err}`);
                });
        } else {
            this.soundObject.pauseAsync()
                .then(() => {
                    this.setState({
                        isEpisodePlaying: false
                    });
                })
                .catch(err => {
                    console.log(`ERROR OCCURRED WHEN PAUSING ${this.episode.TITLE}`);
                    console.log(`ERROR DUE TO: ${err}`);
                });
        }
    }

}

const mapDispatchToProps = dispatch => (
    {
        updateCurrentEpisode: (podcastTitle, episodeId) => dispatch(actions.UPDATE_CURRENT_EPISODE(podcastTitle, episodeId))
    }
)

const mapStateToProps = state => (
    { 
        currentPodcastTitle: state.CurrentEpisodeReducer.currentPodcastTitle,
        currentEpisodeId: state.CurrentEpisodeReducer.currentEpisodeId
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeView);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#fffcf4',
        flexWrap: 'wrap'
    },
    image: {
        height: 350, 
        width: 350,
        margin: 10
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    item: {
        backgroundColor: '#fffcf4',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});