import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import index from './reducers/index';
import Home from './Home';

const store = createStore(index, applyMiddleware(logger));

export default class ReduxWrapper extends Component {
    render() {
        return (
            <Provider store={store}>
                <Home />
            </Provider>
        );
    }
}