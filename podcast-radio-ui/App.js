import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './src/Home';
import Amplify from 'aws-amplify';
import { withAuthenticator, ForgotPassword } from 'aws-amplify-react-native';
import { I18n } from 'aws-amplify';
import CustomSignIn from './src/auth/CustomSignIn';

Amplify.configure(
  {
    Auth: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_LpX73ITEv',
      userPoolWebClientId: '5s0i6oj7bhlav904tf7e6utjj0'
    }
  }
);

I18n.setLanguage('en');
const dict = {
  'en': {
    'Username': 'Email'
  }
}

I18n.putVocabularies(dict);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Home />
    );
  }

}

// export default withAuthenticator(App, false, [
//   <CustomSignIn />,
//   <ForgotPassword />,
// ]);