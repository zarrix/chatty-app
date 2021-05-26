import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Row, Col, Image, Modal, Media, Form, Button, Dropdown} from 'react-bootstrap';
import { faHeart, faComment, faShareSquare } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFilled, faEllipsisH as faDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import calculateTime from '../helperFunctions';



import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import store from '../store';
import { likePost, unlikePost, addComment, getPosts, deletePost, updatePost, deleteComment, editComment } from "../actions/postActions";

import { Link } from "react-router-dom";



function Post({post}) {

  
  const dispatch = useDispatch();
  const {user} = store.getState().user;
  const users = store.getState().users;


  const [liked, setLiked] = useState(false);
  const [likeList, setLikeList] = useState(false);
  const [commentList, setCommentList] = useState(false);
  const [comment, setComment] = useState("");
  const [editCommentForm, setEditCommentForm] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editPostForm, setEditPostForm] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  

  const like = () => {
    dispatch(likePost(post._id, user._id));
    setLiked(true);
  }

  const unlike = () => {
    dispatch(unlikePost(post._id, user._id));
    setLiked(false);
  }

  const handleComment = (e) => {
    e.preventDefault();

    if (comment) {
      dispatch(addComment(post._id, user._id, comment))
      dispatch(getPosts());
      setComment('');
    } else {
      alert("Please fill the form!")
    }
  };

  useEffect(() => {
    if (post.likers.includes(user._id)) setLiked(true);
    else setLiked(false);
  }, [user._id, post.likers, liked]);

  return(
    <div style={{backgroundColor: "white"}} className="mb-3 rounded">
      <Navbar bg="white" style={{border: "none"}}>
        <Container>
        <Link to={`/${post.posterId}`}>
          <Navbar.Brand>
            <Image src={users.length ? users.filter(user => user._id === post.posterId)[0] ? users.filter(user => user._id === post.posterId)[0].avatar : null : null} roundedCircle width={40} height={40} alt="" className="d-inline-block align-top"/>
            <span className="ml-3 font-weight-bold align-middle">{users.length ? users.filter(user => user._id === post.posterId)[0]  ? users.filter(user => user._id === post.posterId)[0].firstName + " " + users.filter(user => user._id === post.posterId)[0].lastName : null : null}</span>
          </Navbar.Brand>
        </Link>
          <span className="float-right align-top">{calculateTime(comment.time)}</span>
          {user._id === post.posterId ? 
            <Dropdown>
              <Dropdown.Toggle as="image">
                <FontAwesomeIcon icon={faDots} size="md" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setEditPostForm(true)} >Edit Post</Dropdown.Item>
                <Modal
                      size="md"
                      show={editPostForm}
                      onHide={() => {
                        setEditPostForm(false);
                        setNewMessage("");
                      }}
                      backdrop="static"
                    >
                      <Modal.Header closeButton>
                      <Modal.Title id="edit-post">
                          Edit your Post
                      </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <Form>
                          <Form.Group>
                              <Form.Label>Post</Form.Label>
                              <Form.Control as="textarea" rows={3} placeholder={post.message} onChange={(e) => setNewMessage(e.target.value)} value={newMessage}  />
                          </Form.Group>
                      </Form>
                      </Modal.Body>
                      <Modal.Footer>
                          <Button variant="secondary" onClick={() => {setEditPostForm(false); setNewMessage("")}}>Cancel</Button>
                          <Button variant="primary" onClick={() => {
                                                              if (newMessage && window.confirm("Are you sure you want to edit this post ?")) {
                                                                dispatch(updatePost(post._id, newMessage));
                                                                setNewMessage("");
                                                                setEditPostForm(false);
                                                              } else {
                                                                alert("Please fill the form!")
                                                              }
                          }}>Edit Post</Button>
                      </Modal.Footer>
                  </Modal>
                <Dropdown.Item 
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this post ?")) {
                      dispatch(deletePost(post._id));
                    }
                    }}>
                    Delete Post</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
           : null}
          
        </Container>
      </Navbar>
      <div className="mt-3">
        <p className="ml-4 mr-4 text-left">{post.message}</p>
        {post.picture ? <Image className="d-block w-100 h-100" src={post.picture} alt="" /> : null}
        <Container className="pb-3 pt-3">
          <Row>
            <Col>
              <div className="text-center">
                <button style={{border: "none", backgroundColor: "white"}} >{liked ? <FontAwesomeIcon color="red" icon={faHeartFilled} size="lg" onClick={unlike}/> : <FontAwesomeIcon icon={faHeart} size="lg" onClick={like} />}</button>
                <a className="font-weight-bold align-top ml-2 text-dark" onClick={() => setLikeList(true)}>{post.likers.length}</a>
                <Modal
                  size="md"
                  show={likeList}
                  onHide={() => setLikeList(false)}
                  aria-labelledby="like-list"
                  centered
                >
                  <Modal.Header closeButton>
                  <Modal.Title id="like-list">
                      Likes ({post.likers.length})
                  </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {post.likers.map(id => 
                      <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                      <div className="d-flex align-items-center hover-pointer">
                          <img className="img-xs rounded-circle" src={users.length ? users.filter(user => user._id === id)[0] ? users.filter(user => user._id === id)[0].avatar : null : null} alt="" />
                          <div className="ml-2 pt-3">
                              <p>{users.length ? users.filter(user => user._id === id)[0] ? users.filter(user => user._id === id)[0].firstName + " " + users.filter(user => user._id === id)[0].lastName : null : null}</p>
                          </div>
                      </div>
                    </div>
                    )}
                  </Modal.Body>
                </Modal>
              </div>
            </Col>
            <Col>
              <div className="text-center">
                <button style={{border: "none", backgroundColor: "white"}} ><FontAwesomeIcon icon={faComment} size="lg"/></button>
                <a className="font-weight-bold align-top ml-2 text-dark" onClick={() => setCommentList(true)}>{post.comments.length}</a>
                <Modal
                  size="md"
                  show={commentList}
                  onHide={() => setCommentList(false)}
                  aria-labelledby="like-list"
                  centered
                >
                  <Modal.Header closeButton>
                  <Modal.Title id="like-list">
                      Comments ({post.comments.length})
                  </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {post.comments.map(comment => 
                      <Media>
                        <Image className="ml-3" 
                          src={users.filter(user => user._id === comment.commenterId).length ? users.filter(user => user._id === comment.commenterId)[0].avatar : null}
                          roundedCircle width={30} height={30} alt="Profile image"/>
                        <Media.Body className="bg-light ml-3 mr-3 mb-3">
                            <h5>{users.filter(user => user._id === comment.commenterId).length ? users.filter(user => user._id === comment.commenterId)[0].firstName + " " + users.filter(user => user._id === comment.commenterId)[0].lastName : null}
                            <span className="float-right text-secondary font-weight-light h6">{calculateTime(comment.timestamp)}</span></h5>
                            <p>{comment.text}</p>
                        </Media.Body>
                        {user._id===comment.commenterId ? 
                          <Dropdown>
                          <Dropdown.Toggle as="image">
                            <FontAwesomeIcon icon={faDots} size="md" />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setEditCommentForm(true)}>Edit Comment</Dropdown.Item>
                            <Modal
                                size="md"
                                show={editCommentForm}
                                onHide={() => {setEditCommentForm(false); setNewComment("")}}
                                backdrop="static"
                            >
                                <Modal.Header closeButton>
                                <Modal.Title id="edit-comment">
                                    Edit your Comment
                                </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder={comment.text} onChange={(e) => setNewComment(e.target.value)} value={newComment}  />
                                    </Form.Group>
                                </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => {setEditCommentForm(false); setNewComment("")}}>Cancel</Button>
                                    <Button variant="primary" onClick={() => {
                                                                        if (newComment && window.confirm("Are you sure you want to edit this comment ?")) {
                                                                          dispatch(editComment(post._id, comment._id, newComment));
                                                                          setNewComment("");
                                                                          setEditCommentForm(false);
                                                                        } else {
                                                                          alert("Please fill the form!")
                                                                        }
                                    }}>Edit Comment</Button>
                                </Modal.Footer>
                            </Modal>
                            <Dropdown.Item 
                            onClick={() => {
                              if (window.confirm("Are you sure you want to delete this post ?")) {
                                dispatch(deleteComment(post._id, comment._id));;
                              }
                              }}>
                              Delete Comment</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        : null}
                        
                      </Media>
                    )}
                  </Modal.Body>
                </Modal>
              </div>
            </Col>
            <Col>
              <div className="text-center">
                <button style={{border: "none", backgroundColor: "white"}} ><FontAwesomeIcon icon={faShareSquare} size="lg" /></button>
              </div>
            </Col> 
          </Row>
        </Container>
        <Media className="rounded bg-white mb-3 pt-3">
          <Image className="ml-3" src={user.avatar} roundedCircle width={40} height={40} alt="Profile image"/>
          <Media.Body className="ml-3 mr-3 mb-3">
              <Form action="" onSubmit={handleComment}>
                  <Form.Group>
                      <Form.Control as="textarea" rows={3} className="bg-light" onChange={(e) => setComment(e.target.value)} value={comment} placeholder={"Write a comment..."}/>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="float-right" >
                      Comment
                  </Button>
              </Form>
          </Media.Body>
        </Media>
      </div>
    </div>
  );
}

export default Post;
