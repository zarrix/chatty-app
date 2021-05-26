import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';

import {Row, Col, Container, Modal, Button,Image, Form} from 'react-bootstrap';
import { faUserPlus, faUserCheck, faUserTimes } from "@fortawesome/free-solid-svg-icons";

import { useState } from 'react'
import {Link, useParams} from 'react-router-dom';


import Post from '../../components/Post';
import CreatePost from '../../components/CreatePost'

import {useDispatch, useSelector} from 'react-redux';
import {getUser, updateUser, uploadPicture} from '../../actions/userActions';
import {getUsers, sendInvitaion} from '../../actions/usersActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../../components/Loading';


function Profile(props) {

    const dispatch = useDispatch();

    const {profileId} = useParams();
    const users = useSelector((state) => state.users);
    const posts = useSelector((state) => state.posts);
    const {user} = useSelector((state) => state.user);

    const [editProfile, setEditProfile] = useState(false);
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newBio, setNewBio] = useState("");
    const [file, setFile] = useState(null)

    return(
        <Container>
            {Object.keys(user).length && users.length ? 
            <div className="profile-page tx-13">
            <Row>
                <div className="col-12 grid-margin">
                    <div className="profile-header">
                        <div className="cover">
                            <div className="gray-shade"></div>
                            <figure>
                                <img src="cover.jpg" className="img-fluid h-25" alt="profile cover" />
                            </figure>
                            <div className="cover-body d-flex justify-content-between align-items-center">
                                <div>
                                    <Image width={70} height={70} roundedCircle src={ users.filter(user => user._id === profileId)[0] ? users.filter(user => user._id === profileId)[0].avatar : null } alt="" />
                                    <span className="profile-name">{ users.filter(user => user._id === profileId)[0] ? users.filter(user => user._id === profileId)[0].firstName + " " + users.filter(user => user._id === profileId)[0].lastName : null }</span>
                                </div>
                                { user._id === profileId ? <div className="d-none d-md-block">
                                    <Button variant="primary" className="btn-icon-text btn-edit-profile" onClick={() => setEditProfile(true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit btn-icon-prepend">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg> Edit profile
                                    </Button>
                                    <Modal
                                        size="lg"
                                        show={editProfile}
                                        onHide={() => {setEditProfile(false);setNewBio("");setNewFirstName("");setNewLastName("");}}
                                        backdrop="static"
                                        aria-labelledby="edit-profile"
                                    >
                                        <Modal.Header closeButton>
                                        <Modal.Title id="edit-profile">
                                            Edit your profile
                                        </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                        <Form className="text-center">
                                            <Form.Group className>
                                                <Form.Label><Image src={user.avatar} roundedCircle width="200" height="200" alt="Profile image" className="mx-auto d-block"/></Form.Label>
                                                <div className="d-block w-100 mt-3"><input className="text-center" type="file" onChange={(e) => setFile(e.target.files[0])}/></div>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mt-5 ml-5">
                                                <Form.Label column sm="2">
                                                First Name : 
                                                </Form.Label>
                                                <Col sm="8">
                                                <Form.Control type="text" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} placeholder={user.firstName} />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mt-5 ml-5">
                                                <Form.Label column sm="2">
                                                Last Name : 
                                                </Form.Label>
                                                <Col sm="8">
                                                <Form.Control type="text" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} placeholder={user.lastName} />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mt-5 ml-5">
                                                <Form.Label column sm="2">
                                                Biography : 
                                                </Form.Label>
                                                <Col sm="8">
                                                <Form.Control as="textarea" rows={3} value={newBio} onChange={(e) => setNewBio(e.target.value)} placeholder={user.biographie} />
                                                </Col>
                                            </Form.Group>
                                        </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => {setEditProfile(false);setNewBio("");setNewFirstName("");setNewLastName("");}}>Cancel</Button>
                                            <Button variant="primary" 
                                                onClick={() => {
                                                    if (newFirstName && newLastName && newBio && window.confirm("Are you sure you want to edit this profile ?")) {
                                                        dispatch(updateUser(user._id, newBio, newFirstName, newLastName));
                                                        dispatch(getUsers())
                                                        dispatch(getUser(user._id))
                                                        if ( file ) {
                                                            const data = new FormData();
                                                            data.append('userId', user._id);
                                                            data.append('pseudo', user.pseudo);
                                                            data.append("file", file);
                                                        
                                                            dispatch(uploadPicture(data));
                                                            setFile(null);
                                                        }
                                                        setNewBio("");
                                                        setNewFirstName("");
                                                        setNewLastName("");
                                                        setEditProfile(false);
                                                    } else {
                                                        alert("Please fill the form!")
                                                    }
                                                }}
                                            >Save changes</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div> 
                                : users.filter(user => user._id === profileId)[0].friendlist.find(id => id === user._id) ? 
                                <div className="d-none d-md-block">
                                    <Button variant="primary" className="btn-icon-text btn-edit-profile" >
                                        <FontAwesomeIcon icon={faUserCheck} color="white" className="mr-2" /> 
                                        Friends
                                    </Button> 
                                </div> : users.filter(user => user._id === profileId)[0].invitationlist.find(id => id === user._id) ?
                                <div className="d-none d-md-block">
                                    <Button variant="primary" className="btn-icon-text btn-edit-profile" >
                                        <FontAwesomeIcon icon={faUserTimes} color="white" className="mr-2" /> 
                                        Cancel Request
                                    </Button> 
                                </div> :
                                <div className="d-none d-md-block">
                                    <Button 
                                        variant="primary" 
                                        className="btn-icon-text btn-edit-profile"
                                        onClick = {() => {
                                            dispatch(sendInvitaion(user._id, profileId));
                                        }} 
                                        >
                                        <FontAwesomeIcon icon={faUserPlus} color="white" className="mr-2" /> 
                                        Add Friend
                                    </Button> 
                                </div> }
                            </div>
                        </div>
                        <div className="header-links">
                            <ul className="links d-flex align-items-center mt-3 mt-md-0">
                                <li className="header-link-item d-flex align-items-center active">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-columns mr-1 icon-md">
                                        <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
                                    </svg>
                                    <a className="pt-1px d-none d-md-block" href="#">Timeline</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Row>
            <Row className="profile-body">
                
                <div className="d-none d-md-block col-md-4 col-xl-3 left-wrapper">
                    <div className="card rounded">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <h6 className="card-title mb-0">About</h6>
                            </div>
                            <p>{user.biographie}</p>
                            <div className="mt-3">
                                <label className="tx-11 font-weight-bold mb-0 text-uppercase">Biography :</label>
                                <p className="text-muted">{ users.filter(user => user._id === profileId)[0] ? users.filter(user => user._id === profileId)[0].biographie : null }</p>
                            </div>
                            <div className="mt-3">
                                <label className="tx-11 font-weight-bold mb-0 text-uppercase">Joined :</label>
                                <p className="text-muted">{ users.filter(user => user._id === profileId)[0] ? users.filter(user => user._id === profileId)[0].createdAt : null }</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-8 col-xl-6 middle-wrapper">
                    { user._id === profileId ? <CreatePost /> : null }
                    <div className="posts">
                        {posts.filter(post => post.posterId === profileId).map((post, index) => <Post post={post} key={index} />)}
                    </div>
                </div>
                
                <div className="d-none d-xl-block col-xl-3 right-wrapper">
                    <div className="row">
                        <div className="col-md-12 grid-margin">
                            <div className="card rounded">
                                <div className="card-body">
                                    <h6 className="card-title">Friends ({ users.filter(user => user._id === profileId)[0] ? users.filter(user => user._id === profileId)[0].friendlist.length : null })</h6>
                                    { users.filter(user => user._id === profileId)[0].friendlist.map(friendId => 
                                        <Link to={`/${friendId}`}>
                                            <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                                                <div className="d-flex align-items-center hover-pointer">
                                                    <img className="img-xs rounded-circle" src={ users.filter(user => user._id === friendId)[0] ? users.filter(user => user._id === friendId)[0].avatar : null} alt="" />
                                                    <div className="ml-2 pt-3">
                                                        <p>{ users.filter(user => user._id === friendId)[0] ? users.filter(user => user._id === friendId)[0].firstName + " " + users.filter(user => user._id === friendId)[0].lastName : null }</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )} 

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>
        </div> :
        <Loading />}
            
        </Container>
    );
}

export default Profile;