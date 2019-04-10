import React from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar';
import ComingSoon from './ComingSoon';

export default function Sponsor(props) {
  return (
    <div>
      <Header />
      <ComingSoon title="Donate"/>
      <Navbar action={props.action} value={3}/>
    </div>
  )
}
