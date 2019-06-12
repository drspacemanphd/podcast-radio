import React from 'react';
import { View } from 'react-native';
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

    componentDidMount() {
        fetch('https://yi4qw8i0fe.execute-api.us-east-1.amazonaws.com/dev/podcast/' + this.podcast.PodcastName + '/episodes')
            .then(result => {
                return result.json();
            })
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
        return (
            <View>
            </View>
        );
    }

}