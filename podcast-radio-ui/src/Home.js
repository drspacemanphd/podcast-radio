import React from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions, Picker } from 'react-native';
import PodcastListView from './views/PodcastListView';

export default class Home extends React.Component {
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
                    <Picker
                        selectedValue='Test One'
                        style={{ height: 50, width: 100 }}>
                        <Picker.Item label="Test One" value="Test One" />
                        <Picker.Item label="Test Two" value="Test Two" />
                    </Picker>
                    <PodcastListView podcasts={this.state.podcasts} />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#F0EAD6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})