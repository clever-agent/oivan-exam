import React, { Component } from 'react';
import './App.scss';
import Login from './Login/Login';
import UserList from './User/UserList';
import UpdateUser from './User/UpdateUser';
import TestList from './Test/TestList';
import UpdateTest from './Test/UpdateTest';


import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

class App extends Component {


  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/UserList" component={UserList} />
          <Route exact path="/UpdateUser" component={UpdateUser} />
          <Route exact path="/TestList" component={TestList} />
          <Route exact path="/UpdateTest" component={UpdateTest} />

        </Switch>
      </Router>
    );
  }
}

export default App;
