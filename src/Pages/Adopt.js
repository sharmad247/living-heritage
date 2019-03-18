import React from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar';

export default function Adopt(props) {
  return (
    <div className="ContainerStyle">
      <Header />
      <h1>Coming Soon</h1>
      <Navbar action={props.action} value={2}/>
    </div>
  )
}
