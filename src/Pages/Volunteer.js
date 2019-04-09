import React from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar';
import ComingSoon from './ComingSoon';

export default function Volunteer(props) {
  return (
    <div>
      <Header />
      <ComingSoon title="Volunteer"/>
      <Navbar action={props.action} value={1}/>
    </div>
  )
}
