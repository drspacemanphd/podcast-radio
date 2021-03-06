import React from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { API } from 'aws-amplify';

export default class PodcastView extends React.Component {

    constructor(props) {
        super(props);
        this.podcast = this.props.navigation.getParam('podcast');
        this.state = {
            episodes: [],
            hasLoaded: false,
            currentEpisode: {}
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('podcast').TITLE,
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
        try {
            let episodesApiResult = await API.get('podcast-api-DEV', '/podcast/' + this.podcast.TITLE + '/episodes');
            this.setState({
                episodes: episodesApiResult.payload,
                hasLoaded: true,
                currentEpisode: this.props.navigation.getParam('currentEpisode')
            });
        } catch(err) {
            console.log(`ERROR WHEN GETTING ${this.podcast.PodcastName} EPISODES`);
            console.log(`ERROR DUE TO ${err}`);
        };
    }

    render() {
        if (!this.state.hasLoaded) {
            return <ActivityIndicator size={100} color='#00356B' style={styles.loader} />
        }
        return (
            <View style={styles.listContainer}>
                <ScrollView>
                    {
                        this.state.episodes.map((e, i) => {
                            return (
                                <ListItem
                                    key={i}
                                    title={e.TITLE}
                                    subtitle={e.PUBLICATION_DATE}
                                    leftAvatar={{ source: { uri: this.podcast.IMAGE_URL } }}
                                    onPress={() => {
                                        this.props.navigation.navigate('EpisodeView', {
                                            episode: e,
                                            podcast: this.podcast,
                                            audioObject: this.props.navigation.getParam('audioObject'),
                                            currentEpisode: this.state.currentEpisode,
                                            handleCurrentEpisodeChange: this.props.navigation.getParam('handleCurrentEpisodeChange')
                                        });
                                    }}
                                    containerStyle={styles.item}
                                />
                            );
                        })
                    }
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        maxHeight: '100%',
        width: '100%',
        justifyContent: 'flex-start',
        backgroundColor: '#fffcf4'
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