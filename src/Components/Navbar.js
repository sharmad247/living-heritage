import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Public from '@material-ui/icons/Public';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SentimentSatisfiedAlt from '@material-ui/icons/SentimentSatisfiedAlt';
import CheckCircle from '@material-ui/icons/CheckCircle';

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  },
};

class Navbar extends React.Component {
    constructor(props) {
        super()
        this.state = {
            value: props.value,
            action: props.action
        };
    }


  handleChange = (event, value) => {
    this.setState({ value })
    this.state.action(value)
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Discover" icon={<Public />} />
        <BottomNavigationAction label="Volunteer" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Adopt" icon={<CheckCircle />} />
        <BottomNavigationAction label="Donate" icon={<SentimentSatisfiedAlt />} />
      </BottomNavigation>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
