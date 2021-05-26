import axios from 'axios';
import { GET_USERS, SEND_INVITATION} from './types';

export const getUsers = () => dispatch => {
    axios
        .get('/api/users/')
        .then(res => {
            dispatch({
            type: GET_USERS,
            payload: res.data
        })});
};

export const sendInvitaion = (senderId, receiverId) => dispatch => {
    axios
        .patch(`/api/users/invitations/${receiverId}`, {"id" : senderId})
        .then(res => {
            dispatch({
            type: SEND_INVITATION,
            payload: {senderId, receiverId}
        })})
        .catch((err) => console.log(err));
        
};


