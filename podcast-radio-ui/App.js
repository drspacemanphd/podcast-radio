import React from 'react';
import ReduxWrapper from './src/ReduxWrapper';
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
      userPoolId: 'us-east-1_jkr89EX04',
      userPoolWebClientId: '3f39qcv9s1c0o306rbe7b2pqtt',
      identityPoolId: 'us-east-1:3aa23f3e-e79e-4c8c-8614-7280beae7fed',
    },
    API: {
      endpoints: [
        {
          name: "podcast-api-DEV",
          endpoint: "https://ot6mjx8llf.execute-api.us-east-1.amazonaws.com/dev"
        }
      ]
    },
    Analytics: {
      disabled: true
    },
    Storage: {
      AWSS3: {
        bucket: 'podcast-radio-mobile-dev',
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
      <ReduxWrapper />
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