import React, { Component } from 'react';
import logo from './logo.png';
import Auth0Lock from 'auth0-lock';
import axios from 'axios';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';


class Home extends Component {
    constructor() {
        super(); 
        this.lock = null;
        this.login = this.login.bind(this);
      }
    
    // componentDidMount() {
    //     this.lock = new Auth0Lock('pqNfBTAqBLOOhqSR8F57fnhJSSW2jcGO' , 'auth0-mini.auth0.com');
    //     console.log('this Auth0lock');
    //     this.lock.on('authenticated', authResult => {
    //       this.lock.getUserInfo(authResult.accessToken, (error, user) => {
    //         axios.post('/api/auth/login', { userId: user.sub }).then(response => {
    //           this.props.login(response.data.user);
    //           this.props.history.push('/dashboard');
    //         }).catch(err=>{console.log(err)})
    //       })
    //     })
    //   }
    
    login() {
        // this.lock.show();
        this.props.history.push('/login');
        

    }

    render() {
        return (
            <div className="App-home">
            <div className="Home-splash">
                <div className="App-logo"><img src={logo} alt="logo"/></div>
                <div>Helo</div>
                <button className="button-black" onClick={this.login}>Login/Register</button>
            </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    login: login,
  };
  
  export default connect(null, mapDispatchToProps)(Home);