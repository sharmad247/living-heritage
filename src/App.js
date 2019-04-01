import React, { Component } from 'react';
import Home from './Pages/Home'
import Adopt from './Pages/Adopt'
import Volunteer from './Pages/Volunteer'
import Sponsor from './Pages/Sponsor'
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import blue from '@material-ui/core/colors/blue';


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
    const theme = createMuiTheme({
      palette: {
        primary: teal,
        secondary: blue,
      },
    });
    return (
      <MuiThemeProvider theme={theme}>
        {(this.state.page===0) ? <Home action={this.handleStateChange}/> : null}
        {(this.state.page===1) ? <Volunteer action={this.handleStateChange}/> : null}
        {(this.state.page===2) ? <Adopt action={this.handleStateChange}/> : null}
        {(this.state.page===3) ? <Sponsor action={this.handleStateChange}/> : null}
      </MuiThemeProvider>
    );
  }
}

export default App;
