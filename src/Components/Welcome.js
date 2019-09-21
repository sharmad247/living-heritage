import React from 'react'
import { Typography } from '@material-ui/core';

const styles = {
    root: {
        paddingTop: 20,
        paddingLeft: 24,
        paddingRight: 24
    }
}

export default function Welcome() {
    return (
        <div style={styles.root}>
            <p>
                <Typography variant="h5">
                    Welcome to the 
                </Typography>
                <Typography variant="h4">
                    Living Heritage App.
                </Typography>
                <br></br>
                <Typography variant="subheading">
                    an initiative by the Living Heritage Foundation.
                </Typography>
            </p>
            <p>
                <Typography>
                    We&rsquo;re losing our precious natural heritage and support system vital for our survival at an alarming rate and protecting them is the need of the hour. Now more than ever!<br />
                </Typography>
            </p>
            <p>
                <Typography>
                    Our App has been designed and developed for this purpose: to geo-tag trees, ascertain their health and determine the risk factors. The objective is to ensure accountability and assign values for conserving and protecting our green cover for our sake and the generations to come. It’s not just about us, but also the birds, animals and a million other species that are dependent on trees. So let’s get moving and volunteer for this good cause.
                </Typography>
            </p>
        </div>
    )
}
