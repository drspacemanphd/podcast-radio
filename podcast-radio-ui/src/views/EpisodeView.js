import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Audio } from 'expo-av';

export default class EpisodeView extends React.Component {
    constructor(props) {
        super(props);
        this.episode = this.props.navigation.getParam('episode');
        this.podcast = this.props.navigation.getParam('podcast');
        this.soundObject = null;
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('episode').Title,
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

    componentWillMount() {
        Audio.setAudioModeAsync(
            { 
                staysActiveInBackground: true,
                playsInSilentModeIOS: false,
                allowsRecordingIOS: false,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                shouldDuckAndroid: true,
                playThroughEarpieceAndroid: false
            }
        )
        .then(() => {
            this.soundObject = new Audio.Sound();
            this.soundObject.loadAsync({ uri: this.episode.Link });
        })
        .catch(err => { 
            console.log(`ERROR WHEN SETTING UP AUDIO`); 
            console.log(`ERROR DUE TO ${err}`);
            return err; 
        })
    }

    componentWillUnmount() {
        if (this.soundObject) {
            this.soundObject.stopAsync();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image 
                    source={{uri: this.podcast.PodcastImage}} 
                    style={styles.image}
                />
                <Text>{this.episode.Title}</Text>
                <Icon 
                    name='play'
                    type='font-awesome'
                    onPress={() => this.play()}
                />
            </View>
        );
    }

    play() {
        this.soundObject.playAsync()
            .catch(err => {
                console.log(`ERROR OCCURRED WHEN PLAYING ${this.episode.Title}`);
                console.log(`ERROR DUE TO: ${err}`);
            });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#fffcf4'
    },
    image: {
        height: 350, 
        width: 350,
        margin: 10
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