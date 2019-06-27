import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { Audio } from 'expo-av';
import { Storage } from 'aws-amplify';

export default class EpisodeView extends React.Component {
    constructor(props) {
        super(props);
        this.episode = this.props.navigation.getParam('episode');
        this.podcast = this.props.navigation.getParam('podcast');
        this.soundObject = null;
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('episode').EpisodeTitle,
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
            return Storage.get(this.episode.EpisodeS3Key);
        })
        .then((url) => {
            this.soundObject = new Audio.Sound();
            return this.soundObject.loadAsync({ uri: url });
        })
        .catch(err => { 
            console.log(`ERROR WHEN SETTING UP AUDIO`); 
            console.log(`ERROR DUE TO ${err}`);
            return err; 
        })
    }

    componentWillUnmount() {
        if (this.soundObject) {
            this.soundObject.stopAsync()
                .then(() => {
                    return this.soundObject.unloadAsync();
                })
                .catch((err) => {
                    console.log(`ERROR OCCURRED WHEN STOPPING PODCAST`);
                    console.log(`ERROR DUE TO ${err}`);
                    return err;
                });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image 
                    source={{uri: this.podcast.ImageUrl}} 
                    style={styles.image}
                />
                <Text style={styles.title}>{this.episode.EpisodeTitle}</Text>
                <Icon
                    name='play'
                    type='font-awesome'
                    onPress={() => this.play()}
                    size={40}
                />
            </View>
        );
    }

    play() {
        this.soundObject.playAsync()
            .catch(err => {
                console.log(`ERROR OCCURRED WHEN PLAYING ${this.episode.EpisodeTitle}`);
                console.log(`ERROR DUE TO: ${err}`);
            });
    }

}

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