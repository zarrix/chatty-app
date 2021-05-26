import axios from 'axios';
import {GET_POSTS, ADD_POST, UPDATE_POST, DELETE_POST, LIKE_POST, UNLIKE_POST, ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT} from './types';

export const getPosts = () => dispatch => {
    axios
        .get('/api/posts/')
        .then(res => {
            dispatch({
            type: GET_POSTS,
            payload: res.data
        })});
};


export const addPost = data => dispatch => {
    axios
        .post('/api/posts', data)
        .then(res => 
            dispatch({
                type: ADD_POST,
                payload: res.data
            }))
        .catch((err) => console.log(err));
};

export const updatePost = (postId, message) => dispatch => {
    axios
        .put(`/api/posts/${postId}`, { message })
        .then((res) => {
            dispatch({ type: UPDATE_POST, payload: { message, postId } });
        })
        .catch((err) => console.log(err));
};


export const deletePost = (postId) => dispatch => {
    axios
        .delete(`/api/posts/${postId}`)
        .then((res) => 
            dispatch({ 
                type: DELETE_POST, 
                payload: { postId } 
            }))
        .catch((err) => console.log(err));
};


export const likePost = (postId, userId) => dispatch => {
    axios
      .patch(`/api/posts/like-post/${postId}`, {id : userId})
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
};


export const unlikePost = (postId, userId) => dispatch => {
    axios
      .patch(`/api/posts/unlike-post/${postId}`, { id: userId })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
};


export const addComment = (postId, commenterId, text) => dispatch => {
    axios
      .patch(`/api/posts/comment-post/${postId}`, { commenterId, text })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: { comment: res.data.comments[res.data.comments.length - 1] } });
      })
      .catch((err) => console.log(err));
};

export const editComment = (postId, commentId, text) => dispatch => {
    axios
        .patch(`api/posts/edit-comment-post/${postId}`, { commentId, text })
        .then((res) => {
            dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
        })
        .catch((err) => console.log(err));
};

export const deleteComment = (postId, commentId) => dispatch => {
  
    axios
        .patch(`/api/posts/delete-comment-post/${postId}`, { commentId })
        .then((res) => {
            dispatch({ 
              type: DELETE_COMMENT, 
              payload: { postId, commentId } });
        })
        .catch((err) => console.log(err));
};


  
