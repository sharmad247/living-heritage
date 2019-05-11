import React from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar'
import {Route} from 'react-router-dom'
import Add from './Add'
import Map1 from '../Components/Map1'
import TreeInfo from './TreeInfo'

export default function Home(props) {
  return (
    <div>
      <Header />
      <div className="ContainerStyle">
        <Route exact path="/" component={Map1}/>
        <Route path="/add" component={Add}/>
        <Route path="/treeinfo" component={TreeInfo}/>
      </div>
      <Route exact path="/" render={() => <Navbar action={props.action} value={0} />} />
    </div>
  )
}
