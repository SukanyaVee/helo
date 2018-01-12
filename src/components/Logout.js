import React from 'react';
import homeP from './home.png';
import searchP from './search.png';


export default function Logout() {
   
    return (
      <div className="App-inside">
        <header className="Inside-header">
        <div>
            <h4>Helo</h4>
          <img src={homeP} alt="Home" className="App-icons"/>
          <img src={searchP}  alt="Search"  className="App-icons"/>
        </div>
          
        </header>
        <div className="top-box">
            LOGGED OUT
        </div>
      </div>
    );
  }
