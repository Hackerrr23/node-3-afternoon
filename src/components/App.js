import React, { Component } from 'react';
import './App.css';

import router from '../router';

class App extends Component {
   componentDidMount(){
     axios.get("/api/swag").then( response => {
       console.log(response)
     }).catch(err => console.log(err))
   }
  render() {
    return (
      <div id="App__container">
        { router }
      </div>
    );
  }
}

export default App;
