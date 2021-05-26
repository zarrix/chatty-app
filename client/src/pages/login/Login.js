import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import "./login.scss";
import { Link, Redirect } from "react-router-dom";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import {Form, Button} from 'react-bootstrap';

function Login() {

  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user).isLogged;

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);

  
    return (
      <div className="background">
      <div className="base-container" >
        <div className="header">Login to Chatty</div>
        <div className="content">
          <div className="image">
            <img src="./login.svg" alt=""/>
          </div>
          <Form>
            <Form.Group>
              <Form.Control className="loginInput mt-3"  placeholder="Email" 
              type="email"
              required
              value={email} 
              onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group >
              <Form.Control placeholder="Password"
              type="password"
              required
              className="loginInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
          </Form>
        </div>
        <Button variant="primary" type="submit" 
        onClick={()=> {
          console.log("Login...");
          
          if (email && password) {
            setLoading(true);
            dispatch(login(email, password));
          } else {
            alert("Please Enter your email and password !")
          }
        }}>
          {loading ? 
                isLogged ? <Redirect to="/" /> : <Loading />
                : (
                  "Log In"
                )}
        </Button>
        <Link to="/register" >
          <Button variant="primary">Register</Button>
        </Link>
      </div>
      </div>
    );
};

export default Login;
