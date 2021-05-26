import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Container, InputGroup, FormControl, Button, Image} from 'react-bootstrap';
import { faSearch, faCheckSquare} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LeftNavBar from '../../components/LeftNavBar';

import store from '../../store';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';

import {acceptInvitaion} from '../../actions/userActions'
import Loading from '../../components/Loading';

function Users() {

    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    const users = store.getState().users; 

    const [search, setSearch] = useState("")

    useEffect(() => {
        
    });

    return(
        <Container className="mt-3" fluid="sm">
            {users.length ? <Row>
                <Col xs={3} id="profile-info"> 
                    <LeftNavBar id={user._id} avatar={user.avatar} lastName={user.lastName} />
                </Col>
                <Col id="post">
                    <Container className="bg-white" fluid>
                        <InputGroup className="pb-3">
                            <FormControl className="border-0 bg-light mt-3 pb-3" value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" />
                            <InputGroup.Append>
                            <Button  variant="outline-secondary" className="bg-ligh border-0 mt-3" ><FontAwesomeIcon icon={faSearch} /></Button>
                            </InputGroup.Append>
                        </InputGroup>
                        {search ? 
                                users.filter(user => (user.firstName+" "+user.lastName).includes(search)).length ? 
                                    users.filter(user => (user.firstName+" "+user.lastName).toLowerCase().includes(search.toLowerCase())).map(user => 
                                        <a href={"/"+user._id} className="contact">
                                            <div className="d-flex justify-content-between mb-2 pb-2 border-bottom ml-3">
                                                <div className="d-flex align-items-center hover-pointer">
                                                    <Image className="img-fluid rounded-circle" width={60} height={60} src={user.avatar} alt="" />
                                                    <div className="ml-3">
                                                        <h6>{user.firstName + " " + user.lastName}</h6>  
                                                    </div>
                                                </div>
                                            </div>
                                        </a>) 
                                    : <div className="text-center mt-5 pb-5"><h6>There is no user with the name "{search}"</h6></div>
                                : users.map(user => 
                                    <a href={"/"+user._id} className="contact">
                                        <div className="d-flex justify-content-between mb-2 pb-2 border-bottom ml-3">
                                            <div className="d-flex align-items-center hover-pointer">
                                                <Image className="img-fluid rounded-circle" width={60} height={60} src={user.avatar} alt="" />
                                                <div className="ml-3">
                                                    <h6>{user.firstName + " " + user.lastName}</h6>  
                                                </div>
                                            </div>
                                        </div>
                                    </a>)    }                     
                    </Container>
                </Col>
                <Col xs={3} className="bg-white mr-3">
                    <h5 className="text-center mt-3">Invitations</h5>
                    {user.invitationlist ? user.invitationlist.map(friendId => 
                        <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                                <div className="d-flex align-items-center hover-pointer">
                                    <img className="img-xs rounded-circle" src={ users.filter(user => user._id === friendId)[0].avatar } alt="" />
                                    <div className="ml-2 pt-3">
                                        <p>{ users.filter(user => user._id === friendId)[0].firstName + " " + users.filter(user => user._id === friendId)[0].lastName }</p>
                                    </div>
                                </div>
                            <button 
                                className="border-0 bg-white"
                                onClick = {() => {
                                    dispatch(acceptInvitaion(friendId, user._id));
                                }}
                            >
                                <FontAwesomeIcon icon={faCheckSquare} size="lg" color="green"/>
                            </button>
                        </div>
                        
                    ) : null }
                    
                </Col>
            </Row> 
            : <Loading />}
            
        </Container>
    );
}

export default Users;