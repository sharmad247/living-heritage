import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { Form } from 'formik';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        margin: theme.spacing.unit,
    },
});

function InfoForm(props) {
    const { classes } = props;
    return (
        <div className={classes.container}>
            <Input
                placeholder="Common Name"
                className={classes.input}
                inputProps={{
                    'aria-label': 'CommonName',
                }}
                fullWidth
            />
            <Input
                placeholder="Scientific Name"
                className={classes.input}
                inputProps={{
                    'aria-label': 'ScientificName',
                }}
                fullWidth
            />
            <Input
                placeholder="Diameter (in inches)"
                className={classes.input}
                inputProps={{
                    'aria-label': 'Diameter',
                }}
                fullWidth
            />
            <Input
                placeholder="Canopy Height (in feet)"
                className={classes.input}
                inputProps={{
                    'aria-label': 'CanopyHeight',
                }}
                fullWidth
            />

        </div>
    );
}



let HealthForm = (props) => {
    const { classes } = props;
    return (
        <div className={classes.container}>
            <Input
                placeholder="Common Name"
                className={classes.input}
                inputProps={{
                    'aria-label': 'CommonName',
                }}
                fullWidth
            />
            <Input
                placeholder="Scientific Name"
                className={classes.input}
                inputProps={{
                    'aria-label': 'ScientificName',
                }}
                fullWidth
            />
            <Input
                placeholder="Diameter (in inches)"
                className={classes.input}
                inputProps={{
                'aria-label': 'Diameter',
                }}
                fullWidth
            />
            <Input
                placeholder="Canopy Height (in feet)"
                className={classes.input}
                inputProps={{
                'aria-label': 'CanopyHeight',
                }}
                fullWidth
            />
        </div>
    );
}

InfoForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

HealthForm.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default InfoForm