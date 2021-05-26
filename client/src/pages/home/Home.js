import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

import Post from '../../components/Post';
import CreatePost from '../../components/CreatePost'
import LeftNavBar from '../../components/LeftNavBar';

import {Row, Col, Container} from 'react-bootstrap';
import { faCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { useSelector } from "react-redux";

import Loading  from '../../components/Loading';





function Home() {

  
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const {user} = useSelector((state) => state.user);
  
  return (
    <div className="home">
      {Object.keys(user).length && users.length && posts.length ? 
      <Container className="mt-3">
      <Row>
        <Col id="profile-info"> 
          <LeftNavBar id={user._id} avatar={user.avatar} lastName={user.lastName} />
        </Col>
        <Col xs={6} id="post">
          <CreatePost />
          <div class="posts">
            {posts.map((post, index) => <Post post={{...post}} key={index} />)}
          </div>
        </Col>
        <Col id="message">
          <h5>Contacts</h5>
          {user.friendlist ? user.friendlist.map(friendId => 
            <a href="#contact" className="contact">
            <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
              <div className="d-flex align-items-center hover-pointer">
                  <img className="img-xs rounded-circle" src={ users.filter(user => user._id === friendId)[0]  ? users.filter(user => user._id === friendId)[0].avatar : null } alt="" />
                  <div className="ml-2 pt-3">
                      <p>{ users.filter(user => user._id === friendId)[0] ? users.filter(user => user._id === friendId)[0].firstName + " " + users.filter(user => user._id === friendId)[0].lastName : null }</p>
                      
                  </div>
              </div>
              <FontAwesomeIcon icon={faCircle} size="sm" color="green" className="m-auto"/>
            </div>
          </a>
          ) : null }
          
        </Col>
      </Row>
    </Container> :
    <Loading />}
      
    </div>
  );
}

export default Home; 
