import React from 'react';
import Amplify from 'aws-amplify';
import { withAuthenticator, ForgotPassword, RequireNewPassword, AmplifyTheme } from 'aws-amplify-react-native';
import { I18n } from 'aws-amplify';
import CustomSignIn from './src/auth/CustomSignIn';
import CustomSignUp from './src/auth/CustomSignUp';
import CustomConfirmSignUp from './src/auth/CustomConfirmSignUp';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import index from './src/reducers/index';
import Home from './src/Home';

const store = createStore(index, applyMiddleware(logger));

Amplify.configure(
  {
    Auth: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_kBcsAYDY2',
      userPoolWebClientId: '6ihh3ke7304l5e8drvv8f4t7a8',
      identityPoolId: 'us-east-1:2def28cf-43da-40fe-ac55-98f597f93a2b',
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
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }

}

const customContainer = { ...AmplifyTheme.container };
customContainer.backgroundColor = '#00356B';
AmplifyTheme.container = customContainer;

export default withAuthenticator(App, false, [
  <CustomSignIn />,
  <ForgotPassword />,
  <CustomSignUp />,
  <CustomConfirmSignUp />,
  <RequireNewPassword />
], null, AmplifyTheme);