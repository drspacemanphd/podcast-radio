import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class PodcastListView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.listContainer}>
                <ScrollView>
                    {
                        this.props.podcasts.map((p, i) => {
                            return (
                                <ListItem
                                    key={i}
                                    title={p.PodcastName}
                                    subtitle={p.PodcastAuthor}
                                    leftAvatar={{ source: { uri: p.PodcastImage } }}
                                    onPress={() => {
                                        this.props.navigation.navigate('PodcastView', {
                                            podcast: p
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
    }
});