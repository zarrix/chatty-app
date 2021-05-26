import {ACCEPT_INVITATION, GET_USER, LOGIN, LOGOUT, UPDATE_USER, UPLOAD_PICTURE} from '../actions/types';

const initialState = {
    user : [],
    isLogged: false
};

export default function(state=initialState, action) {
    switch(action.type) {
        case GET_USER: 
            return {
                ...state,
                user: action.payload,
            };
        case UPDATE_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    biographie: action.payload.biographie,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName 
                },
            };
        case UPLOAD_PICTURE:
            return {
                ...state,
                user: {
                    ...state.user,
                    picture: action.payload,
                },
            };
        case ACCEPT_INVITATION:
            return {
                ...state,
                user: {
                    ...state.user,
                    invitationlist: state.user.invitationlist.filter(id => id !== action.payload.senderId),
                    friendlist: [action.payload.senderId, ...state.user.friendlist]
                },
            };
        case LOGIN:
            return {
                ...state,
                isLogged: true
            }
        case LOGOUT:
            return {
                ...state,
                isLogged: false
            }
        default: return state;
    }
}


