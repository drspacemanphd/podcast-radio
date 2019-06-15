import React from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class PodcastView extends React.Component {

    constructor(props) {
        super(props);
        this.podcast = this.props.navigation.getParam('podcast');
        this.state = {
            episodes: [],
            hasLoaded: false
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('podcast').PodcastName,
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

    componentDidMount() {
        fetch('https://yi4qw8i0fe.execute-api.us-east-1.amazonaws.com/dev/podcast/' + this.podcast.PodcastName + '/episodes')
            .then(result => result.json())
            .then(result => {
                this.setState({
                    episodes: result.payload,
                    hasLoaded: true
                });
            })
            .catch(err => {
                console.log(err);
            });
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
                                    title={e.Title}
                                    subtitle={e.PublicationDate}
                                    leftAvatar={{ source: { uri: this.podcast.PodcastImage } }}
                                    onPress={() => {
                                        this.props.navigation.navigate('EpisodeView', {
                                            episode: e,
                                            podcast: this.podcast
                                        })
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