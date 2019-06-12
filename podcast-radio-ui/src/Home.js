import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import PodcastListView from './views/PodcastListView';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import PodcastView from './views/PodcastView';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            podcasts: [],
            hasLoaded: false
        }
    }

    componentDidMount() {
        fetch('https://yi4qw8i0fe.execute-api.us-east-1.amazonaws.com/dev/podcast/all')
            .then(result => {
                return result.json();
            })
            .then(result => {
                this.setState({
                    podcasts: result.payload,
                    hasLoaded: true
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        if (!this.state.hasLoaded) {
            return <ActivityIndicator size={100} color='#800000' style={styles.loader} />
        } else {
            return (
                <View style={styles.container}>
                    <PodcastListView podcasts={this.state.podcasts} navigation={this.props.navigation} />
                </View>
            );
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

const appStack = createStackNavigator(
    {
        Home: Home,
        PodcastView: PodcastView
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(appStack);

