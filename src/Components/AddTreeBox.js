import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import useForceUpdate from 'use-force-update';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        position: "fixed",
        bottom: 56,
        width: '100%',
        minHeight: 50
    },
    buttons: {
        width: '100%',
    },
    next: {
        marginRight: theme.spacing.unit * 5,
        float: 'right'
    }
});

let marker = null
let pos

function AddTreeBox(props) {
    console.log(props.firebaseApp)
    let fb= props.firebaseApp
    console.log(fb)

    let markerFlag = true

    let [buttonDisabled, setDisabled] = useState(true);

    const forceUpdate = useForceUpdate()


    let MyLink = (props) => <Link   to={{
        pathname: "/addtree",
        position: pos,
        firebaseApp: fb
      }} {...props} />


    let addMarker = (location) => {
        marker = new window.google.maps.Marker({
            position: location,
            map: props.map,
            draggable: true
        });
        pos = location.toJSON()
        setDisabled(false)
        window.google.maps.event.clearListeners(props.map, 'click');
        marker.addListener('position_changed', function(event) {
            let temp = marker.getPosition()
            pos = temp.toJSON()
            forceUpdate()
        })
        console.log(pos)
    }

    let handleCancel = () => {
        if (marker !== null)
        {
            marker.setMap(null);
        }
        props.handleCancel()
    }

    const { classes } = props;

    props.map.addListener('click', function(event) {
        if(markerFlag) {
            addMarker(event.latLng)
            markerFlag = false
        }
    })

    return (
        <div className="ContainerStyle">
            <Paper className={classes.root} elevation={1}>
                <Typography variant="body2" gutterBottom>
                    Step 1: Tap to add a marker. <br/>
                    Step 2: Long press and drag to move it in exact position.
                </Typography>
                <br/>
                <div className={classes.buttons}>
                    <Button variant="outlined" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button disabled={buttonDisabled} variant="outlined" component={MyLink} className={classes.next}>
                        Next
                    </Button>
                </div>
            </Paper>
        </div>
    );
}

AddTreeBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddTreeBox);