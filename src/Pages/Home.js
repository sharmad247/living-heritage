import React from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar'
import {Route} from 'react-router-dom'
import Add from './Add'
import Map from '../Components/Map'
import TreeInfo from './TreeInfo'

export default function Home(props) {
  return (
    <div>
      {props.user ? <Header user={props.user} signout={props.signOut}/> : null}
      <div className="ContainerStyle">
        <Route exact path="/" component={Map}/>
        <Route path="/addtree" component={Add}/>
        <Route path="/treeinfo" component={TreeInfo}/>
      </div>
      <Route exact path="/" render={() => <Navbar action={props.action} value={0} />} />
    </div>
  )
}
