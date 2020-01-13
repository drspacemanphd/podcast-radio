import React from 'react';

import { connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import index from './src/reducers/index';
import actions from './src/actions/index';

import Amplify, { I18n } from 'aws-amplify';
import { withAuthenticator, ForgotPassword, RequireNewPassword, AmplifyTheme } from 'aws-amplify-react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';
import CustomSignIn from './src/auth/CustomSignIn';
import CustomSignUp from './src/auth/CustomSignUp';
import CustomConfirmSignUp from './src/auth/CustomConfirmSignUp';
import views from './src/navigation/NavigationConfiguration';

// Configure Amplify
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



// Configure Navigation
const appStack = () => {
  return createStackNavigator(views,
    {
      initialRouteName: 'Home',
      headerLayoutPreset: 'center'
    }
  );
};

const Navigation = createAppContainer(appStack());



// Configure Auth
class AuthWrapper extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.onStateChange);
    if (this.props.shouldLogOut) {
      this.props.toggleLogOut(false);
      this.props.onStateChange('signOut');
    }
  }

  render() {
    return <Navigation />
  }

}

const mapStateToProps = (state) => ({
  shouldLogOut: state.Logout.shouldLogOut
});

const mapDispatchToProps = dispatch => ({
  toggleLogOut: (shouldLogOut) => dispatch(actions.SHOULD_LOGOUT(shouldLogOut))
});

AuthWrapper = connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);

const customContainer = { ...AmplifyTheme.container };
customContainer.backgroundColor = '#00356B';
AmplifyTheme.container = customContainer;

AuthWrapper = withAuthenticator(AuthWrapper, false, [
  <CustomSignIn />,
  <ForgotPassword />,
  <CustomSignUp />,
  <CustomConfirmSignUp />,
  <RequireNewPassword />
], null, AmplifyTheme);



// Configure Parent App
const store = createStore(index, applyMiddleware(logger));

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <AuthWrapper />
      </Provider>
    );
  }

}