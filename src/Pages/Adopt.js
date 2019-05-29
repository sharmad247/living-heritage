import React from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar';
import ComingSoon from './ComingSoon';

export default function Adopt(props) {
  return (
    <div>
      <Header user={props.user} signout={props.signOut}/>
      <ComingSoon title="Adopt"/>
      <Navbar action={props.action} value={2}/>
    </div>
  )
}
