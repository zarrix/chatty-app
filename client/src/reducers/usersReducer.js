import {GET_USERS, SEND_INVITATION} from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    case SEND_INVITATION:
      return state.map((user) => {
          if (user._id === action.payload.receiverId) {
            return {
                ...user,
                invitationlist: [action.payload.senderId, ...user.invitationlist],
            };
          } else return user;
      });
    default:
      return state;
  }
}

