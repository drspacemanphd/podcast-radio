import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import PodcastListView from './views/PodcastListView';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import views from './config/Navigation';
import { Auth, Storage } from 'aws-amplify';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            podcasts: [],
            hasLoaded: false
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

    componentDidMount() {

        fetch('https://yi4qw8i0fe.execute-api.us-east-1.amazonaws.com/dev/podcast/all')
            .then(result => result.json())
            .then(result => {

                let podcasts = result.payload;
                
                return new Promise((resolve, reject) => {
                    let signedUrls = [];
                    podcasts.forEach(p => signedUrls.push(Storage.get(p.PodcastImageKey)));

                    Promise.all(signedUrls)
                        .then(urls => {
                            for (let i = 0; i < urls.length; i++) {
                                podcasts[i].ImageUrl = urls[i];
                            }
                            resolve(podcasts);
                        })
                        .catch(err => {
                            console.log(`ERROR WHEN GETTING TEMP URLS`);
                            console.log(`ERROR DUE TO ${err}`);                            
                            reject(err);
                        })
                });

            })
            .then(podcasts => {
                this.setState({
                    podcasts: podcasts,
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