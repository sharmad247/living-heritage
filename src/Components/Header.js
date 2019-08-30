import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import logo from '../Assets/logo.png'

const styles = {
  root: {
    flexGrow: 1,
    boxShadow: '0 0px 0px 0px rgba(255, 105, 135, 0) !important;'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 30,
  },
};

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            classes: props,
            left: false,
            title: props.title
        } 
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };
  
    render() {

        const sideList = (
          <div className={this.state.classes.list}>
            <List>
                <ListItem key="logo">
                    <img alt="logo" width='200' src={logo}></img>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>
                  <ListItemText primary={this.props.user.displayName} />
                </ListItem>
                <ListItem button onClick={this.props.signout}>
                  <ListItemText primary="Sign Out" />
                </ListItem>
                <ListItem button onClick={()=>{window.location.reload(true)}}>
                  <ListItemText primary="Refresh App" />
                </ListItem>
            </List>
          </div>
        );
    
        return (
            <div className={this.state.classes.root}>
              <AppBar position="fixed">
                <Toolbar>
                    <IconButton onClick={this.toggleDrawer('left', true)} className={this.state.classes.menuButton} color="inherit" >
                    <MenuIcon />
                    </IconButton>
                    <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer('left', false)}
                    onOpen={this.toggleDrawer('left', true)}
                    >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {sideList}
                    </div>
                    </SwipeableDrawer>
                    <Typography variant="h6" color="inherit" className={this.state.classes.grow}>
                        Living Heritage
                    </Typography>
                </Toolbar>
              </AppBar>
            </div>
          );
    }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);