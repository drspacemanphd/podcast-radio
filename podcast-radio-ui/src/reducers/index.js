import { combineReducers } from 'redux';
import CurrentEpisodeReducer from './CurrentEpisodeReducer';
import Logout from './Logout';

const reducers = {
    CurrentEpisodeReducer,
    Logout
}

export default combineReducers(reducers);