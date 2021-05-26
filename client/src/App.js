import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import AppNavbar from './components/AppNavBar';
import Users from './pages/users/Users';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { useDispatch, useSelector } from 'react-redux';
import {getUsers} from './actions/usersActions';
import {getPosts} from './actions/postActions';
import { verifyUser} from './actions/userActions';
import Cookies from 'js-cookie';


const App = () => {

  const jwt = Cookies.get('jwt');

  const dispatch = useDispatch();
  dispatch(getUsers());
  dispatch(getPosts());
  dispatch(verifyUser());

  const isLogged = useSelector(state => state.user).isLogged;


  return (
    <Router>
      <Switch>
        <Route path="/" exact>{jwt || isLogged ? <><AppNavbar /><Home /></> : <Redirect to="/login"/>}</Route>
        <Route path="/login" exact><Login /></Route>
        <Route path="/register" exact><Register /></Route>
        <Route path="/users" exact>{jwt || isLogged ? <><AppNavbar /><Users /></> : <Redirect to="/login"/>}</Route>
        {/* <Route path="/profile" exact component={Profile} /> */}
        <Route path="/:profileId" >{jwt || isLogged ? <><AppNavbar /><Profile /></> : <Redirect to="/login"/>}</Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;