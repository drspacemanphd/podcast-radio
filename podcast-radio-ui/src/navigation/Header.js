import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import actions from '../actions/index';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            awaitingSignOut: false
        }
    }

    async signOut() {
        await this.setState({
            awaitingSignOut: true
        });
        await Auth.signOut();
        await this.setState({
            awaitingSignOut: false
        });
        this.props.toggleLogout(true);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Podcast Radio</Text>
                <View style={styles.logout}>
                    {this.state.awaitingSignOut ? 
                        <ActivityIndicator color='white' style={{ margin: 0, padding: 0 }} /> :
                        <Icon name='power-settings-new' color='white' onPress={() => this.signOut()}/>
                    }
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        height: '11.5%',
        backgroundColor: '#00356B',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    title: {
        color: 'white',
        fontFamily: 'sans-serif-thin',
        fontSize: 20,
        fontWeight: '900',
    },
    logout: {
        position: 'absolute',
        left: Dimensions.get('window').width * 0.9,
        top: '78%'
    }
});

const mapDispatchToProps = dispatch => ({
    toggleLogout: shouldLogOut => dispatch(actions.SHOULD_LOGOUT(shouldLogOut))
});

export default connect(null, mapDispatchToProps)(Header);