import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,  Nav } from 'react-bootstrap';



import { faSearch, faHome, faCommentDots, faUsers, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';


function AppNavBar() {

    const dispatch = useDispatch();

    const isLogged = useSelector(state => state.user).user;

    

    return(
        <Navbar className="navbar navbar-expand-lg" bg="white" sticky="top" >
            <Navbar.Brand href="/">
                <img
                alt=""
                src="logochatty.png"
                width="40"
                height="40"
                className="d-inline-block align-middle"
                />{' '}
                <span className="align-middle">Chatty</span>
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav" className="align-middle">
                {/* <div>
                    <InputGroup>
                        <FormControl className="border-0" type="text" placeholder="Search" />
                        <InputGroup.Append>
                        <Button  variant="outline-secondary" className="bg-white border-0" ><FontAwesomeIcon icon={faSearch} /></Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div> */}
                <Nav className="ml-auto">
                    <Nav.Link href="/"><FontAwesomeIcon icon={faHome} size="lg" /></Nav.Link>
                    <Nav.Link href="#chat"><FontAwesomeIcon icon={faCommentDots} size="lg" /></Nav.Link>
                    <Nav.Link href="/users"><FontAwesomeIcon icon={faUsers} size="lg" /></Nav.Link>
                    
                    <Nav.Link  href="/login"
                    onClick={() => {
                        dispatch(logout());

                    }} 
                    className="ml-5 float-right"><FontAwesomeIcon icon={faSignOutAlt} size="lg" /></Nav.Link>
                    {!isLogged ? <Redirect to="/login" /> : null}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}


export default AppNavBar;