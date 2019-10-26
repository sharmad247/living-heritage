import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AlertIcon from '@material-ui/icons/PriorityHigh';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { Link, Route } from 'react-router-dom'
import VolEdit from '../Pages/VolEdit';

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
        position: 'fixed',
        bottom: 21,
        right: 21,
        color: theme.palette.common.white,
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[600],
        },
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});



function FABAlert(props) {
    const { classes } = props
    const [isOpen, toggleOpen] = useState(false);
    
    function handleClick() {
        console.log(isOpen)
        console.log(urlInaccuracy)
        console.log(urlFelling)
        toggleOpen(true)
        console.log(isOpen)
    };

    console.log(props.treeData)
    console.log(encodeURIComponent(JSON.stringify(props.treeData)))
    const urlFelling = "https://api.whatsapp.com/send?phone=919920293387&text=REPORT%20FELLING%0A%0ATree%20Data%20%3A%20" + encodeURIComponent(JSON.stringify(props.treeData))
    const urlInaccuracy = "https://api.whatsapp.com/send?phone=919920293387&text=REPORT%20INNACURATE%20DATA%0A%0ATree%20Data%20%3A%20" + encodeURIComponent(JSON.stringify(props.treeData))

    function handleClose(type) {
        toggleOpen(false)
    };

    return (
        <div>
            <Fab color="primary" aria-label="alert" className={classes.fab} onClick={handleClick}>
                <AlertIcon />
            </Fab>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Want to report an issue with this tree?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let the Living Heritage team know about a inaccurate data or fallen trees.
                        You will be redirected to our WhatsApp number where you can also add further details.
                    </DialogContentText>
                    <br />
                    <DialogContentText id="alert-dialog-description">
                        Does this tree have inaccurate data or is the being felled or missing?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        <a href={urlInaccuracy} target="_blank">Inaccurate Data</a>
                    </Button>
                    <Button onClick={handleClose}>
                        <a href={urlFelling} target="_blank">Felling</a>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

FABAlert.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FABAlert);