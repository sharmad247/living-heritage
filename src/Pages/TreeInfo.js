import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText} from '@material-ui/core';


const styles = theme => ({
  root: {
      width: '100%',
      height: '100%'
  },
});


class TreeInfo extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      treeData : {...props.location.treedata}
    }
  }

  render() {
    console.log(this.state.treeData)
    return (
      <React.Fragment>
        <List>
          <ListItem divider>
            <ListItemText
              primary="Generic Name"
              secondary={this.state.treeData.data.info.genericName}
            />
          </ListItem>
          <ListItem divider>
            <ListItemText
              primary="Scientific Name"
              secondary={this.state.treeData.data.info.scientificName}
            />
          </ListItem>
          <ListItem divider>
            <ListItemText
              primary="Diameter"
              secondary={this.state.treeData.data.info.diameter + ' m'} 
            />
          </ListItem>
          <ListItem divider>
              <ListItemText
                primary="Height"
                secondary={this.state.treeData.data.info.height + ' m'} 
              />
          </ListItem>
          <ListItem divider>
            <ListItemText
              primary="Canopy Height"
              secondary={this.state.treeData.data.info.canopyHeight + ' m'}
            />
          </ListItem>


          <ListItem alignItems="center">
            <ListItemText
                  primary="Health Checks"
            />
          </ListItem>
          <ListItem alignItems="center">
            <ListItemText
                  secondary={this.state.treeData.data.info.genericName}
            />
          </ListItem>
          <ListItem alignItems="center">
            <ListItemText
                  secondary={this.state.treeData.data.info.genericName}
            />
          </ListItem>
          <ListItem alignItems="center">
            <ListItemText
                  secondary={this.state.treeData.data.info.genericName}
            />
          </ListItem>
          <ListItem alignItems="center">
            <ListItemText
                  secondary={this.state.treeData.data.info.genericName}
            />
          </ListItem>
        </List>
      </React.Fragment>
    )
  }
}


TreeInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TreeInfo);