import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './components/home';
import Dashboard from './components/dashboard';


class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={Home}/>
        <Route path="/dashboard" exact component={Dashboard}/>
      </div>
    );
  }
}

export default App;
