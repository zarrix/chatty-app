import axios from 'axios';
import {ACCEPT_INVITATION, GET_USER, LOGIN, LOGOUT, UPDATE_USER, UPLOAD_PICTURE} from './types';

export const login = (email, password) => dispatch => {
    axios
        .post('/api/users/login', {email, password})
        .then(res => {
            console.log(res.data.user);
            dispatch(getUser(res.data.user));
            dispatch({
            type: LOGIN
        })})
        .catch((err) => alert("Email or Password incorrect !"))

};

export const logout = () => dispatch => {
    
    axios
        .get('/api/users/logout')
        .catch((err) => {console.log('logout...');
        dispatch({
            type: LOGOUT
        })});

};

export const verifyUser = () => dispatch => {
    axios
        .get('/jwtid')
        .then(res => {
            dispatch(getUser(res.data));
            dispatch({
            type: LOGIN
        })})
        .catch(err => console.log(err));

};


export const getUser = id => dispatch => {
    axios
        .get(`/api/users/${id}`)
        .then(res => {
            dispatch({
            type: GET_USER,
            payload: res.data
        })});
};

export const updateUser = (userId, biographie, firstName, lastName) => {
    return (dispatch) => {
      axios
        .put(`/api/users/${userId}`, {biographie, firstName, lastName})
        .then((res) => {
          dispatch({ type: UPDATE_USER, payload: {biographie, firstName, lastName} });
        })
        .catch((err) => console.log(err));
    };
  };

export const uploadPicture = (data) => {
    return (dispatch) => {
        axios
        .post(`/api/users/upload`, data)
        .then(res => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
};

export const acceptInvitaion = (senderId, receiverId) => dispatch => {
  axios
      .patch(`/api/users/friends/${senderId}`, {"id" : receiverId})
      .then(res => {
          dispatch({
          type: ACCEPT_INVITATION,
          payload: {senderId, receiverId}
      })})
      .catch((err) => console.log(err));
      
};





