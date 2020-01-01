import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Dimensions, Text, View, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { SignIn } from 'aws-amplify-react-native';
import { Auth } from 'aws-amplify';

export default class CustomSignIn extends SignIn {
    constructor(props) {
        super(props);
        this.resolveUserMessageError = this.resolveUserMessageError.bind(this);
        this.renderAuthSubmitResponse = this.renderAuthSubmitResponse.bind(this);
        this.customSignIn = this.customSignIn.bind(this);
        this.initialState = {
            error: null,
            password: null,
            username: null,
            awaitingAuthResponse: false
        }
        this.state = { ...this.initialState }
    }

    async customSignIn() {

        await this.setState({
            awaitingAuthResponse: true
        });

        const username = this.getUsernameFromInput() || '';
        const { password } = this.state;

        try {
            const user = await Auth.signIn(username, password);
            await this.checkContact(user);
            await this.setState({
                ...this.initialState
            });
        } catch (err) {
            await this.error(err);

            if (this.state.error === 'User is not confirmed.') {
                const username = this.state.username
                await this.setState({
                    ...this.initialState
                }, this.changeState('confirmSignUp', username));
            }

            await this.setState({
                awaitingAuthResponse: false
            });
        }

    }

    renderAuthSubmitResponse() {
        if (!this.state.awaitingAuthResponse) {
            return (
                <View style={{marginTop: 10, height: 15}}>
                    <Text style={{ color: 'rgba(255,155,155,1)', margin: 0, padding: 0, textAlign: 'center', fontSize: 12 }}>{!this.state.error ? '' : this.resolveUserMessageError(this.state.error)}</Text>
                </View>
            );
        } else {
            return (
                <View style={{ marginTop: 10, height: 15 }}>
                    <ActivityIndicator color='white' style={{margin: 0, padding: 0 }} />
                </View>
            );
        }
    }

    resolveUserMessageError(errorMessage) {
        const messagesToOverwrite = [
            'Custom auth lambda trigger is not configured for the user pool.'
        ];
        if (messagesToOverwrite.includes(errorMessage)) return 'Something went wrong. Check if valid email/password are provided!';
        else return errorMessage;
    }

    showComponent(theme) {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Input 
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input} 
                    placeholder='Email'
                    label='Email'
                    onChangeText={(text) => this.setState({ username: text })}
                />
                <Input 
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    secureTextEntry={true}
                    placeholder='Password'
                    label='Password'
                    onChangeText={(text) => this.setState({ password: text })}
                />
                <View style={styles.buttonContainer}>
                    <Button 
                        type='outline' 
                        title='Sign In'
                        buttonStyle={styles.button} 
                        titleStyle={styles.buttonTitle} 
                        disabled={!this.state.username || !this.state.password}
                        onPress={this.customSignIn}
                    />
                    <Text style={{ color: 'white', marginTop: 25, fontSize: 15 }} onPress={() => {
                        this.setState({
                            ...this.initialState
                        }, this.changeState('signUp'));
                    }}>
                        Don't have an account? Click here to sign up!
                    </Text>
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