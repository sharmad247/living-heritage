import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Divider, Paper, Button } from '@material-ui/core';
import GalleryView from '../Components/GalleryView';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import FABDelete from '../Components/FABDelete';
import * as firebase from 'firebase/app'
import FABAlert from '../Components/FABAlert';


const styles = {
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF'
  }
}



class TreeInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeData: this.props.location.treedata,
      hasError: false,
      isOpen: false,
      photoIndex: 0
    }
  }

  matchUser = () => {
    if(this.state.treeData.updates)
      return false
    else if(this.state.treeData.updates.createdUser === firebase.auth().currentUser.email)
      return true
  }


  render() {
    const { photoIndex } = this.state;
    const images = this.state.treeData.images
    return (
      <React.Fragment>
        <Paper>
          <List>
            <ListItem alignItems="center">
              <ListItemText
                primary="Tree Information"
              />
            </ListItem>
            <ListItem >
              <ListItemText
                primary="Common Name"
                secondary={this.state.treeData.info.genericName}
              />
            </ListItem>
            <ListItem >
              <ListItemText
                primary="Scientific Name"
                secondary={this.state.treeData.info.scientificName}
              />
            </ListItem>
            <ListItem >
              <ListItemText
                primary="Diameter"
                secondary={this.state.treeData.info.diameter + ' in'}
              />
            </ListItem>
            <ListItem >
              <ListItemText
                primary="Circumference"
                secondary={this.state.treeData.info.diameter ? this.state.treeData.info.diameter * 2 * 3.1415 + ' in' : ' in'}
              />
            </ListItem>
            {/* <ListItem >
                <ListItemText
                  primary="Height"
                  secondary={this.state.treeData.info.height + ' ft'} 
                />
            </ListItem>
            <ListItem >
              <ListItemText
                primary="Canopy Height"
                secondary={this.state.treeData.info.canopyHeight + ' ft'}
              />
            </ListItem> */}
            {this.state.treeData.images ? <GalleryView onClick={() => this.setState({ isOpen: true })} img={this.state.treeData.images} /> : null}

            {this.state.isOpen && (
              <Lightbox
                mainSrc={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + images.length - 1) % images.length,
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % images.length,
                  })
                }
                reactModalStyle={
                  {
                    overlay: {
                      position: 'fixed',
                      top: "56px",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(255, 255, 255, 0.75)'
                    }
                  }
                }
              />
            )}
            <Divider />
            {/* 29th Oct 2019 Update Fix , last updated on 2nd Aug 2019*/}
            {/* <ListItem >
              <ListItemText
                primary="Last Updated"
                secondary={this.state.treeData.updates.updatedAt}
              />
            </ListItem> */}
            <Divider />




            {/* Health Checks */}
            <ListItem alignItems="center">
              <ListItemText
                primary="Health Checks"
              />
            </ListItem>

            {
              this.state.treeData.info.flower ?
                <ListItem >
                  <ListItemText
                    secondary="Flowers at the time of initial survey."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.info.fruit ?
                <ListItem >
                  <ListItemText
                    secondary="Fruits at the time of initial survey."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.healthChecks.sap ?
                <ListItem >
                  <ListItemText
                    secondary="Sap oozing from tree trunk."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.healthChecks.fungus ?
                <ListItem >
                  <ListItemText
                    secondary="Fungi noticed on the tree."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.healthChecks.saprophyte ?
                <ListItem >
                  <ListItemText
                    secondary="Tree serving as a saprophyte/spiphyte to live on."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.healthChecks.brownmud ?
                <ListItem >
                  <ListItemText
                    secondary="Brown mud-like deposits on the trunk/branch of the tree."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.healthChecks.stripped ?
                <ListItem >
                  <ListItemText
                    secondary="Outermost layer of the trunk stripped off."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.healthChecks.wilting ?
                <ListItem >
                  <ListItemText
                    secondary="Curling, wilting or discolouration noticed on the tree or the leaves."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.healthChecks.tumours ?
                <ListItem >
                  <ListItemText
                    secondary="Tumors, bulges or swellings seen on the trunk or bark of the tree."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.healthChecks.branchCrack ?
                <ListItem >
                  <ListItemText
                    secondary="Damage, holes or cracks noticed on the branch."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.healthChecks.cutBranches ?
                <ListItem >
                  <ListItemText
                    secondary="Broken or cut branches."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.healthChecks.construction ?
                <ListItem >
                  <ListItemText
                    secondary="Construction or perimeter built around the tree."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.healthChecks.fire ?
                <ListItem>
                  <ListItemText
                    secondary="Visible signs of fire being burnt near or around the tree."
                  />
                </ListItem> :
                null
            }
            <Divider />




            {/* Environmental Risks */}
            <ListItem alignItems="center">
              <ListItemText
                primary="Environmental Risks"
              />
            </ListItem>
            {
              this.state.treeData.environmentalRisks.widened ?
                <ListItem >
                  <ListItemText
                    secondary="Tree on inner road likely to be widened."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.environmentalRisks.highway ?
                <ListItem >
                  <ListItemText
                    secondary="Tree on a highway stretch."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.environmentalRisks.publicLand ?
                <ListItem >
                  <ListItemText
                    secondary="Tree on public land."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.environmentalRisks.industrial ?
                <ListItem >
                  <ListItemText
                    secondary="Tree located near industrial land."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.environmentalRisks.inhabitedPrivate ?
                <ListItem >
                  <ListItemText
                    secondary="Tree in an inhabited private property."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.environmentalRisks.cutTrees ?
                <ListItem >
                  <ListItemText
                    secondary="Signs of other trees being cut down in the area."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.environmentalRisks.perimeterProperty ?
                <ListItem >
                  <ListItemText
                    secondary="Tree located near the perimeter of the property."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.environmentalRisks.overgrownBranches ?
                <ListItem >
                  <ListItemText
                    secondary="Overgrown branches close to electric/telephone wires."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.environmentalRisks.centerProperty ?
                <ListItem >
                  <ListItemText
                    secondary="Tree located in the center of the property."
                  />
                </ListItem> :
                null
            }

            {
              this.state.treeData.environmentalRisks.uninhabitedPrivate ?
                <ListItem >
                  <ListItemText
                    secondary="Tree in uninhabited private property."
                  />
                </ListItem> :
                null
            }
          </List>
          {this.matchUser() ? <FABDelete /> : null}
          <FABAlert treeData={this.state.treeData}/>
          {console.log(this.state.treeData)}
        </Paper>
      </React.Fragment>
    )
  }
}


TreeInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TreeInfo);