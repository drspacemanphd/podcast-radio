import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class PodcastItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.podcast.PodcastName}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'white',
    }
});