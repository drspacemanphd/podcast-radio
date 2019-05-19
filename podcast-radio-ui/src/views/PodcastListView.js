import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { ListItem } from 'react-native-elements';
import PodcastItem from './PodcastItem';

export default class PodcastListView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.listContainer}>
                {
                    this.props.podcasts.map((p, i) => {
                        return (
                            <ListItem
                                key={i}
                                title={p.PodcastName}
                                subtitle={p.PodcastAuthor}
                                leftAvatar={{ source: { uri: p.PodcastImage }}}
                                onPress={() => console.log(p.PodcastAuthor)}
                            />
                        );
                    })
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        maxHeight: '75%',
        width: '90%',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        width: '80%',
    }
});