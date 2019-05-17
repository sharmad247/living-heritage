import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

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

function AddTreeBox(props) {

    let markerFlag = true

    let [buttonDisabled, setDisabled] = useState(true);

    const MyLink = (props) => <Link to="/addtree" {...props} />


    let addMarker = (location) => {
        marker = new window.google.maps.Marker({
            position: location,
            map: props.map,
            draggable: true
        });
        setDisabled(false)
        window.google.maps.event.clearListeners(props.map, 'click');
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