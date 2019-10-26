import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import {Link, Route} from 'react-router-dom'
import VolEdit from '../Pages/VolEdit';

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
        position: 'fixed',
        bottom: 88,
        right: 21,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});


function FABEdit(props) {
    const { classes } = props;
    return (
        <div>
            <Link to={{
                pathname: "/voledit",
                state: { ...props.state },
                firebaseApp: props.firebaseApp
            }}>
                <Fab color="secondary" aria-label="edit" className={classes.fab}>
                    <EditIcon />
                </Fab>
            </Link>
            <Route path="/voledit" component={VolEdit} />
        </div>
    );
}

FABEdit.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FABEdit);