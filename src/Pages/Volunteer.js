import React from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar';
import VolunteerMap from '../Components/VolunteerMap'
import ReactGA from 'react-ga'
import {Route} from 'react-router-dom'
import TreeInfo from './TreeInfo'

export default function Volunteer(props) {
  return (
    <div>
      {
        ReactGA.event({
          category: 'User',
          action: 'Volunteer'
        })
      }
      <Header user={props.user} signout={props.signOut}/>
      <div className="ContainerStyle">
      <Route exact path="/" render={() => <VolunteerMap firebaseApp={props.firebaseApp}/>}/>
        <Route path="/treeinfo" component={TreeInfo}/>
      </div>
      <Route exact path="/" render={() => <Navbar action={props.action} value={1} />} />
    </div>
  )
}
