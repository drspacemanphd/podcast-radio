import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Dimensions, ActivityIndicator } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { ConfirmSignUp } from 'aws-amplify-react-native';
import { Auth } from 'aws-amplify';

export default class CustomConfirmSignUp extends ConfirmSignUp {
    constructor(props) {
        super(props);
        this.customConfirm = this.customConfirm.bind(this);
        this.initialState = {
            ...this.state,
            awaitingAuthResponse: false
        }
        this.state = { ...this.initialState }
    }

    async customConfirm() {
        await this.setState({
            awaitingAuthResponse: true
        });

        try {
            const { username, code } = this.state;
            let data = await Auth.confirmSignUp(username, code);
            await this.changeState('signedUp');
            await this.setState({
                ...this.initialState
            });
        } catch(err) {
            await this.error(err);
            await this.setState({
                awaitingAuthResponse: false
            });
        }
    }

    resolveUserMessageError(errorMessage) {
        const messagesToOverwrite = [
            'Custom auth lambda trigger is not configured for the user pool.'
        ];
        if (messagesToOverwrite.includes(errorMessage)) return 'Something went wrong. Check if valid email/password are provided!';
        else return errorMessage;
    }

    renderAuthSubmitResponse() {
        if (!this.state.awaitingAuthResponse) {
            return (
                <View style={{ marginTop: 10, height: 15 }}>
                    <Text style={{ color: 'rgba(255,155,155,1)', margin: 0, padding: 0, textAlign: 'center', fontSize: 12 }}>{!this.state.error ? '' : this.resolveUserMessageError(this.state.error)}</Text>
                </View>
            );
        } else {
            return (
                <View style={{ marginTop: 10, height: 15 }}>
                    <ActivityIndicator color='white' style={{ margin: 0, padding: 0 }} />
                </View>
            );
        }
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
                    <Button type='outline' title='Confirm' buttonStyle={styles.button} titleStyle={styles.buttonTitle} onPress={this.customConfirm} disabled={!this.state.username || !this.state.code} />
                    <Text style={{ color: 'white', marginTop: 25, fontSize: 15, textAlign: 'center' }}>Check your email for a confirmation code.</Text>
                    <Text style={{ textDecorationLine: 'underline', color: 'white', marginTop: 15, fontSize: 15, textAlign: 'center' }}>You will be asked to sign in again after confirmation.</Text>
                </View>
                {this.renderAuthSubmitResponse()}
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
        maxHeight: 200,
        width: (Dimensions.get('window').width * 0.85),
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