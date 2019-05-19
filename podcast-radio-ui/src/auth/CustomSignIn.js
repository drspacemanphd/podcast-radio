import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Dimensions, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { SignIn } from 'aws-amplify-react-native';

export default class CustomSignIn extends SignIn {
    constructor(props) {
        super(props)
        this._validAuthStates = ['signIn', 'signedOut', 'signedUp'];
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
                <Text style={{color: 'white', fontSize: 16, marginTop: 10 }} onPress={() => this.changeState('forgotPassword')}>Forget your password?</Text>
                <View style={styles.buttonContainer}>
                    <Button type='outline' title='Sign In' buttonStyle={styles.button} titleStyle={styles.buttonTitle} onPress={this.signIn}/>
                    <Button type='outline' title='Sign Up' buttonStyle={styles.button} titleStyle={styles.buttonTitle} />
                </View>
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
        backgroundColor: '#003366',
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
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
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