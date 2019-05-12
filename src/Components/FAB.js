import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: 77,
    right: 21,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function FAB(props) {
  const { classes } = props;
  return (
    <div>
      <Fab color="primary" aria-label="Add" onClick={props.onClick} className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  );
}

FAB.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FAB);