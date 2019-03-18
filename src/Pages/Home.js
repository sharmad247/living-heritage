import React from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar';
import Map from '../Components/Map'
import FAB from '../Components/FAB'

export default function Home(props) {
  return (
    <div>
      <Header />
      <div className="ContainerStyle">
        <Map />
      </div>
      <FAB />
      <Navbar action={props.action} value={0} />
    </div>
  )
}
