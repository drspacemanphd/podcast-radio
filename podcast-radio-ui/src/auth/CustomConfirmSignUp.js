import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { ConfirmSignUp } from 'aws-amplify-react-native';
import { Auth } from 'aws-amplify';

export default class CustomConfirmSignUp extends ConfirmSignUp {
    constructor(props) {
        super(props);
    }

    showComponent(theme) {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Input
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    placeholder='Email'
                    label='Email'
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })}
                />
                <Input
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    placeholder='Enter Your Confirmation Code'
                    label='Confirmation Code'
                    onChangeText={(text) => this.setState({ code: text })}
                />
                <View style={styles.buttonContainer}>
                    <Button type='outline' title='Confirm' buttonStyle={styles.button} titleStyle={styles.buttonTitle} onPress={this.confirm} disabled={!this.state.username || !this.state.code} />
                    <Text style={{ color: 'white', marginTop: 25, fontSize: 15 }}>Check your email for a confirmation code. You will be asked to sign in again after confirmation.</Text>
                </View>
                <Text style={{ color: 'white' }}>{this.state.error === undefined ? '' : this.state.error}</Text>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,51,102,0.9)'
    },
    inputContainer: {
        backgroundColor: 'white',
        maxWidth: (Dimensions.get('window').width * 0.85),
        maxHeight: (Dimensions.get('window').height * 0.12),
        margin: 5,
        borderRadius: 10,
        flex: 1,
        justifyContent: 'space-evenly',
    },
    buttonContainer: {
        flex: 1,
        maxHeight: 100,
        width: (Dimensions.get('window').width * 0.85),
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        backgroundColor: 'white',
        width: 150,
        height: 50,
        borderStyle: 'solid',
        borderRadius: 10
    },
    buttonTitle: {
        color: '#003366'
    }
});