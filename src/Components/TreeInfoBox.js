import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        position: "fixed",
        bottom: 56
    },
});

function TreeInfoBox(props) {
    const { classes } = props;

    return (
        <div className="ContainerStyle">
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                    {props.name}
                </Typography>
                <Typography component="p">
                    Tree description asdhas laks dasdkha sdlk asldkjas djabf lakdj alskd sdlajfhalsdkhfkj sdflhasd fsdf .
                </Typography>
            </Paper>
        </div>
    );
}

TreeInfoBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TreeInfoBox);