import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Dimensions, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { SignUp } from 'aws-amplify-react-native';

export default class CustomSignUp extends SignUp {
    constructor(props) {
        super(props);
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
                    <Button type='outline' title='Sign Up' buttonStyle={styles.button} titleStyle={styles.buttonTitle} onPress={this.signUp} />
                    <Text style={{ color: 'white', marginTop: 25, fontSize: 15 }} onPress={() => this.changeState('signIn')}>Already have an account? Click here to sign in!</Text>
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