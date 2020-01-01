import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Dimensions, Text, View, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { SignUp } from 'aws-amplify-react-native';
import { Auth } from 'aws-amplify';

export default class CustomSignUp extends SignUp {
    constructor(props) {
        super(props);
        this.resolveUserMessageError = this.resolveUserMessageError.bind(this);
        this.renderAuthSubmitResponse = this.renderAuthSubmitResponse.bind(this);
        this.signUp = this.signUp.bind(this);
        this.initialState = { 
            error: null,
            password: null,
            username: null,
            awaitingAuthResponse: false
        }
        this.state = { ...this.initialState }
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

    resolveUserMessageError(errorMessage) {
        const messagesToOverwrite = [
            'Custom auth lambda trigger is not configured for the user pool.'
        ];
        if (messagesToOverwrite.includes(errorMessage)) return 'Something went wrong. Check if valid email/password are provided!';
        else return errorMessage;
    }

    async signUp() {
        await this.setState({
            awaitingAuthResponse: true
        });

        try {
            const signup_info = {
                username: this.state.username,
                password: this.state.password,
                attributes: {},
            };

            let data = await Auth.signUp(signup_info)

            await this.changeState('confirmSignUp', data.user.username);
            await this.setState({
                ...this.initialState
            });

        } catch (err) {
            this.error(err);
            await this.setState({
                awaitingAuthResponse: false
            });
        }

    }

    showComponent(theme) {
        this.signUpFields = this.defaultSignUpFields;
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
                        title='Sign Up' 
                        buttonStyle={styles.button} 
                        titleStyle={styles.buttonTitle} 
                        onPress={this.signUp} 
                        disabled={!this.state || !this.state.username || !this.state.password}
                    />
                    <Text style={{ color: 'white', marginTop: 25, fontSize: 15 }} onPress={() => {
                        this.setState({
                            ...this.initialState
                        }, this.changeState('signIn'));
                    }}>
                        Already have an account? Click here to sign in!
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