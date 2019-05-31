import React, { Component } from 'react';
import Home from './Pages/Home'
import Adopt from './Pages/Adopt'
import Volunteer from './Pages/Volunteer'
import Sponsor from './Pages/Sponsor'
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import blue from '@material-ui/core/colors/blue';


import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Config from './FirebaseConfig';
import SignIn from './Pages/SignIn';

let firebaseApp = firebase.initializeApp(Config)
let firebaseAppAuth = firebaseApp.auth()
let providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class App extends Component {
  constructor() {
    super()
    this.state = {
      page: 0
    }
  }
  
  handleStateChange = page => {
    this.setState({page:page})
  }

  render() {
    const {
      user
    } = this.props;

    const theme = createMuiTheme({
      palette: {
        primary: teal,
        secondary: blue,
      },
      typography: {
        useNextVariants: true,
      },
    });


    const authUser = 
      <MuiThemeProvider theme={theme}>
          {(this.state.page===0) ? <Home action={this.handleStateChange} firebaseApp={firebaseApp} {...this.props}/> : null}
          {(this.state.page===1) ? <Volunteer action={this.handleStateChange} {...this.props}/> : null}
          {(this.state.page===2) ? <Adopt action={this.handleStateChange} {...this.props}/> : null}
          {(this.state.page===3) ? <Sponsor action={this.handleStateChange} {...this.props}/> : null}
      </MuiThemeProvider>
    

    const unauthUser = <MuiThemeProvider theme={theme}>
      <SignIn {...this.props}/>
    </MuiThemeProvider>

    return (
      <React.Fragment>
        {user ? authUser : unauthUser}
      </React.Fragment>
    );
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);