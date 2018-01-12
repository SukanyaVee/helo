import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Dashboard from './components/dashboard';


class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={Home}/>
        <Route path="/dashboard" exact component={Dashboard}/>
        <Route path="/login" component={Login}/>
      </div>
    );
  }
}

export default App;
