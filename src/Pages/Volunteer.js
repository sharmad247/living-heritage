import React from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar';
import ComingSoon from './ComingSoon';
import ReactGA from 'react-ga'

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
      <ComingSoon title="Volunteer"/>
      <Navbar action={props.action} value={1}/>
    </div>
  )
}
