import React from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar'
import {Route} from 'react-router-dom'
import Add from './Add'
import Map from '../Components/Map'
import TreeInfo from './TreeInfo'
import SignIn from './SignIn';

export default function Home(props) {
  return (
    <div>
      {props.user ? <Header /> : null}
      <div className="ContainerStyle">
        <Route exact path="/" component={Map}/>
        <Route path="/addtree" component={Add}/>
        <Route path="/treeinfo" component={TreeInfo}/>
      </div>
      <Route exact path="/" render={() => <Navbar action={props.action} value={0} />} />
      <Route path="/signin" component={SignIn}/>
    </div>
  )
}
