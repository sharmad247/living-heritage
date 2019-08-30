import React from 'react'
import Welcome from './Welcome';
import HelpExpansionPanel from "./HelpExpansionPanel"

let contentHeight = document.documentElement.clientHeight - 112

const styles = {
    minHeight: contentHeight,
}

export default function ComingSoon(props) {
  return (
    <div style={styles} className="ContainerStyle">
        <Welcome />
        <HelpExpansionPanel />
    </div>
  )
}

