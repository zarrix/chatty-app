import {combineReducers} from 'redux';
import postReducer from './postReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    posts : postReducer,
    user: userReducer,
    users : usersReducer
});

