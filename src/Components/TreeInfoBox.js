import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom'

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
});

function TreeInfoBox(props) {
    const { classes, ...treeData } = props;
    return (
        <div className="ContainerStyle">
            <Link to={{
                pathname: "/treeinfo",
                treedata: {...treeData}
            }}>
                <Paper className={classes.root} elevation={1}>
                    <Grid container spacing={24}>
                        <Grid item xs={3}>
                            <img id="boxImg" alt="cover" src="https://via.placeholder.com/150?text=Tree+Photo"></img>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h5" component="h3">
                                {treeData.data.info.genericName}
                            </Typography>
                            <Typography component="p">
                                {treeData.data.info.scientificName}
                            </Typography>
                        </Grid>
                    </Grid> 
                </Paper>
            </Link>
        </div>
    );
}

TreeInfoBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TreeInfoBox);