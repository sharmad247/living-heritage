import React from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar';
import HelpContainer from '../Components/HelpContainer'
import ReactGA from 'react-ga'

export default function Adopt(props) {
  return (
    <div>
      {
        ReactGA.event({
          category: 'User',
          action: 'Help'
        })
      }
      <Header user={props.user} signout={props.signOut}/>
      <HelpContainer ClassName="ContainerStyle"/>
      <Navbar action={props.action} value={2}/>
    </div>
  )
}
