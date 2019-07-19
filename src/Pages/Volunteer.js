import React from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar';
import VolunteerMap from '../Components/VolunteerMap'
import ReactGA from 'react-ga'
import {Route} from 'react-router-dom'
import VolTreeInfo from './VolTreeInfo'
import VolEdit from './VolEdit';

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
        <Route path="/voltreeinfo" component={VolTreeInfo}/>
        <Route path="/voledit" component={VolEdit}/>
      </div>
      <Route exact path="/" render={() => <Navbar action={props.action} value={1} />} />
    </div>
  )
}
