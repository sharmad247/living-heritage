import React, { Component } from 'react'
import { Button } from '@material-ui/core';
import logo from '../Assets/logo.png'


class SignIn extends Component {
    render() {
        const {
            signInWithGoogle,
        } = this.props;

        return (
            <div className="SignIn">
                <img alt="logo" width='200' src={logo}></img>
                <Button size="large" onClick={signInWithGoogle} variant="outlined" color="primary">
                    Sign In with Google
                </Button>
            </div>
        )
    }
}

//export default withStyles(styles)(SignIn);

export default SignIn