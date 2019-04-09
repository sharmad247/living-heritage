import React from 'react'
import Typography from '@material-ui/core/Typography'
import soon from '../Assets/soon.png'

let contentHeight = document.documentElement.clientHeight - 112

const styles = {
    minHeight: contentHeight
}

export default function ComingSoon(props) {
  return (
    <div className="ComingSoon"
        style={styles}>
        <div>
            <img alt="coming-soon" width='70%' src={soon}></img>
            <Typography variant="body1" gutterBottom>
                The Living Heritage team is working very hard to get the {props.title} section up and running.
            </Typography>
            <Typography variant="h5" gutterBottom>
                Stay tuned!
            </Typography>
        </div>
    </div>
  )
}
