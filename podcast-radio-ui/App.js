import React from 'react';
import Home from './src/Home';
import Amplify from 'aws-amplify';
import { withAuthenticator, ForgotPassword, SignUp, ConfirmSignUp, RequireNewPassword } from 'aws-amplify-react-native';
import { I18n } from 'aws-amplify';
import CustomSignIn from './src/auth/CustomSignIn';
import CustomSignUp from './src/auth/CustomSignUp';
import CustomConfirmSignUp from './src/auth/CustomConfirmSignUp';

Amplify.configure(
  {
    Auth: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_sBg9MvsjQ',
      userPoolWebClientId: '1ib0je127c4ed6ma28qqkab32n',
      identityPoolId: 'us-east-1:021c740d-ffd5-4d98-8331-3a83c1ff7068',
    },
    Analytics: {
      disabled: true
    },
    Storage: {
      AWSS3: {
        bucket: 'podcast-radio-dev',
        region: 'us-east-1'
      }
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

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Home />
    );
  }

}

export default withAuthenticator(App, false, [
  <CustomSignIn />,
  <ForgotPassword />,
  <CustomSignUp />,
  <CustomConfirmSignUp />,
  <RequireNewPassword />
]);