import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button';

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


class FABDelete extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            deleted :false,
            vertical: 'top',
            horizontal: 'center',
          };
    
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Fab color="red" aria-label="edit" className={classes.fab} onClick={this.handleClickOpen}>
                    <DeleteIcon />
                </Fab>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Delete Tree"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this tree? This can't be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Yes
                        </Button>
                        <Button onClick={this.handleClose} color="gray" autoFocus>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );

    }
    
}

FABDelete.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FABDelete);