import React from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar';

import FAB from '../Components/FAB'
import MapContainer from '../Components/Map'

export default function Home(props) {
  return (
    <div>
      <Header />
      <div className="ContainerStyle">
        <MapContainer />
      </div>
      <FAB />
      <Navbar action={props.action} value={0} />
    </div>
  )
}
