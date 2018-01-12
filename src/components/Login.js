import React, { Component } from 'react';
import homeP from './home.png';
import searchP from './search.png';
import axios from 'axios';
import {connect} from 'react-redux';
import {login} from '../ducks/reducer'


class Login extends Component {

    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
        this.login = this.login.bind(this)
    }

    login(){
        axios.post('/api/auth/login', this.state.username).then(response => {
            this.props.login(response.data.user);
            this.props.history.push('/dashboard');
        })
        
    }

  render() {
    return (
      <div className="App-inside">
        <header className="Inside-header">
        <div>
            <h4>Helo</h4>
          <img src={homeP} alt="Home" className="App-icons"/>
          <img src={searchP}  alt="Search"  className="App-icons"/>
        </div>
          <h5>Dashboard</h5>
          <h6>Logout</h6>
        </header>
        <div className="top-box">
            <input onChange={event=>{this.setState({username: event.target.value})}}/>
            <input onChange={event=>{this.setState({password: event.target.value})}}/>
            <button onClick={this.login}>Login</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      user: state.user
    };
  };
  
  const mapDispatchToProps = {
    login: login,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);