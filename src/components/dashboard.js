import React, { Component } from 'react';
import homeP from './home.png';
import searchP from './search.png';
import axios from 'axios';
import {connect} from 'react-redux';
import {login} from '../ducks/reducer'
// import Logout from './Logout'
import {Link} from 'react-router-dom';


class Dashboard extends Component {
    componentDidMount() {
        axios.get('/user-data').then(response => {
          if (response.data.user) {
            this.props.login(response.data.user);
          }
        });
      }

  render() {
      const logout = 'logout'
    return (
      <div className="App-inside">
        <header className="Inside-header">
        <div>
            <h4>Helo</h4>
          <img src={homeP} alt="Home" className="App-icons"/>
          <img src={searchP}  alt="Search"  className="App-icons"/>
        </div>
          <h5>Dashboard</h5>
          <h6><Link to="/logout/:logout">Logout {logout}</Link></h6>
        </header>
        <div className="top-box">
            <div className="content-div">
            <div><img src={this.props.user.pic} alt="profile"/></div>
            {this.props.user.name}
            </div>
            <div className="content-div"> blah blah blah
            </div>
        </div>
        <div className="bottom-box">
            Recommended Friends
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);