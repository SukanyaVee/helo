import React, { Component } from 'react';
import logo from './logo.png';

class Home extends Component {
  render() {
    return (
     
        <div className="App-home">
          <div className="Home-splash">
            <div className="App-logo"><img src={logo}/></div>
            <div>Helo</div>
            <button className="button-black" onClick={this.login}>Login/Register</button>
          </div>
        </div>
    );
  }
}

export default Home;
