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
import 'firebase/messaging';
import Config from './FirebaseConfig';
import SignIn from './Pages/SignIn';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-142591629-1');
ReactGA.pageview(window.location.pathname);

let firebaseApp = firebase.initializeApp(Config)
let firebaseAppAuth = firebaseApp.auth()
let messaging
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging()
  messaging.usePublicVapidKey("BP1bB1VIB1zziviY38GM1DoEiwm-gVGXtl2yqbjGYzrhuxMRdMhv1hh8CBVnrt_ggFPBhX87Cr4NY8IzYAKvX50")
}

//let messaging = firebase.messaging()
let providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class App extends Component {
  constructor() {
    super()
    this.state = {
      page: 0,
      token: ''
    }
  }

  getFCMToken = () => {
    console.log("getFCMToken")
    messaging.requestPermission()
      .then(() => {
        console.log("Have permission!")
        return messaging.getToken()
      })
      .then(token => {
        console.log("Token Then")
        console.log(token)
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        myHeaders.append('Authorization', 'key=AAAAtAhLIt4:APA91bH0z_Mt0RunsU9Q8P1jQUuIuu-ZmLdlP5T8d5ppwi-eP34qxnW77Fx90gIK5v6GXuFi8iJ4Wa3N8K8UHH8rBaBTW8IF7-niO_71574QfV2R0ZWhFnpS2Mn36VJ8iKQqEs2eY_Bb');

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch("https://iid.googleapis.com/iid/v1/"+token+"/rel/topics/broadcast", requestOptions)
          .then(res => console.log(res))
      })
      .catch(err => {
        console.log("Error Occured: ", err)
      })
  }

  handleStateChange = page => {
    this.setState({ page: page })
  }


  componentDidMount() {
    this.getFCMToken()
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
        {(this.state.page === 0) ? <Home action={this.handleStateChange} firebaseApp={firebaseApp} {...this.props} /> : null}
        {(this.state.page === 1) ? <Volunteer action={this.handleStateChange} {...this.props} /> : null}
        {(this.state.page === 2) ? <Adopt action={this.handleStateChange} {...this.props} /> : null}
        {(this.state.page === 3) ? <Sponsor action={this.handleStateChange} {...this.props} /> : null}
      </MuiThemeProvider>


    const unauthUser = <MuiThemeProvider theme={theme}>
      <SignIn {...this.props} />
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