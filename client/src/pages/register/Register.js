import axios from "axios";
import { useState } from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import { Redirect} from "react-router";
import {Form, Button} from 'react-bootstrap';

export default function Register() {
  
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [register, setRegister] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log({"psuedo" : username, firstName, lastName, email, password});
    if (username && firstName && lastName && email && password) {
      if (password === repeatedPassword) {
        axios
          .post("/api/users/register", {"pseudo" : username, firstName, lastName, email, password})
          .then(res => setRegister(true));
      } else alert("passwords are not identical !")
      
    } else alert("Please enter all informations !")
    
    }


 
    return (
      <div className="background">
      <div className="base-container" >
       <div className="logo"></div>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src="./login.svg" alt="" />
          </div>
          <Form onSubmit={handleRegister}>
            <Form.Group>
              <Form.Control className="loginInput mt-3"  placeholder="Username" 
              type="username"
              required
              value={username} 
              onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Form.Control className="loginInput mt-3"  placeholder="First Name" 
              type="text"
              required
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Form.Control className="loginInput mt-3"  placeholder="Last Name" 
              type="text"
              required
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)}/>
            </Form.Group>
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
              minLength="6"
              className="loginInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group >
              <Form.Control placeholder="Repeat password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              value={repeatedPassword}
              onChange={(e) => setRepeatedPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" className="text-center" >Register</Button>
          </Form>
        </div>
        <Link to="/login" >
          <Button>Login</Button>
        </Link>
        {register ? <Redirect to='/login' /> : null}
      </div>
      </div>
    );
  }
