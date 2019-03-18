import React, { Component } from 'react';
import Home from './Pages/Home'
import Adopt from './Pages/Adopt'
import Volunteer from './Pages/Volunteer'
import Sponsor from './Pages/Sponsor'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      page: 0,
    }
  }
  handleStateChange = page => {
    this.setState({page:page})
  }
  render() {
    return (
      <div>
        {(this.state.page===0) ? <Home action={this.handleStateChange}/> : null}
        {(this.state.page===1) ? <Volunteer action={this.handleStateChange}/> : null}
        {(this.state.page===2) ? <Adopt action={this.handleStateChange}/> : null}
        {(this.state.page===3) ? <Sponsor action={this.handleStateChange}/> : null}
      </div>
    );
  }
}

export default App;
