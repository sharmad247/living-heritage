import React from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar'
import MapContainer from '../Components/Map'
import Route from 'react-router-dom/Route'
import Add from './Add'


export default function Home(props) {
  return (
    <div>
      <Header />
      <div className="ContainerStyle">
        <Route exact path="/" component={MapContainer} />
        <Route path="/add" component={Add} />
      </div>
      {/* <Navbar action={props.action} value={0} /> */}
      <Route exact path="/" render={() => <Navbar action={props.action} value={0} />} />
    </div>
  )
}
