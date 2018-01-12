import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './components/home';
import Dashboard from './components/dashboard';
import Login from './components/Login';
import Logout from './components/Logout';


class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/dashboard" exact component={Dashboard}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/logout/:logout" exact component={Logout}/>
      </Switch>
    );
  }
}

export default App;
