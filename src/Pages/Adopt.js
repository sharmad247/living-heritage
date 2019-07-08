import React from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar';
import ComingSoon from './ComingSoon';
import ReactGA from 'react-ga'

export default function Adopt(props) {
  return (
    <div>
      {
        ReactGA.event({
          category: 'User',
          action: 'Adopt'
        })
      }
      <Header user={props.user} signout={props.signOut}/>
      <ComingSoon title="Adopt"/>
      <Navbar action={props.action} value={2}/>
    </div>
  )
}
