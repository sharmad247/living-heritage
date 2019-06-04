import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import AutoSuggest from '../Components/FieldAutosuggest';
import Input from '@material-ui/core/Input';
import { Checkbox, List, ListItem, ListItemText, Fab } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
//import * as admin from 'firebase-admin'
import uuidv1 from 'uuid/v1'
import * as firebase from 'firebase/app';
import 'firebase/firestore';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
  fab: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: 47,
    right: 21,
  }
});

class SimpleExpansionPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genericName: '',
      scientificName: '',
      diameter: null,
      height: null,
      canopyHeight: null,
      fruit: false,
      flower: false,
      sap: false,
      fungus: false,
      saprophyte: false,
      brownmud: false,
      stripped: false,
      wilting: false,
      tumours: false,
      branchCrack: false,
      cutBranches: false,
      construction: false,
      fire: false,
      widened: false,
      highway: false,
      publicLand: false,
      industrial: false,
      inhabitedPrivate: false,
      cutTrees: false,
      perimeterProperty: false,
      overgrownBranches: false,
      centerProperty: false,
      uninhabitedPrivate: false
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name
    this.setState({
      [name]: value
    });
  }

  handleCheck = (event, name) => {
    if (!this.state[name])
      this.setState({
        [name]: true
      });
    else
      this.setState({
        [name]: false,
      });
  }

  addTree = () => {
      let pos = this.props.location.position

      let db = this.props.location.firebaseApp.firestore()
      let uid = uuidv1()

      //Saves tree UID and coordinates in the index
      db.collection('index').doc('mapload').update({
        data: firebase.firestore.FieldValue.arrayUnion({"id" : uid, "pos" : {"lat" : pos.lat, "long" : pos.lng} })});

      //saves main info on tree
      db.collection('trees').doc(uid).set({
        info: {
          genericName: this.state.genericName,
          scientificName: this.state.scientificName, //string,
          // age: null,
          flower: this.state.flower, //true/false,
          fruit: this.state.fruit, //true/false,
          diameter: this.state.diameter, //num,
          height: this.state.height, //num,
          canopyHeight: this.state.canopyHeight, //num,
        },
        healthChecks: {
          cutBranches: this.state.cutBranches, //t/f,  //Do you see broken or cut branches.
          sap: this.state.sap, //t/f,                    //Do you see sap oozing out from the tree trunk.
          branchCrack: this.state.branchCrack, //t/f,   //Do you see holes or cracks in the branches or tree.
          brownmud: this.state.brownmud, //t/f, //Brown mud like deposit on the tree or the trunk.
          tumours: this.state.tumours, //t/f, //Tumors, bulges or swellings noticed on the trunk or branches.
          fungus: this.state.fungus, //t/f,  //Fungus visible on the branches or on the trunk.
          wilting: this.state.wilting, //t/f,  //Curling wilting or dis-colourisation notice in the leaves.
          saprophyte: this.state.saprophyte, //t/f,  //Saprophyte or epiphyte growing on the tree.
          fire: this.state.fire, //t/f,  //Signs of fire being burnt near the tree. (anywhere under the canopy of the tree)
          stripped: this.state.stripped, //t/f,  //Outermost layer of the tree trunk stripped.
          construction: this.state.construction, //t/f, //Perimeter or construction built around the tree.
        },
        updates: {
          // createdUser: //UUID,
          //createdTime = new Date(), //timezone?,
          //updatedUser : tree["Updated By"],
          //updatedAt : tree["Updated At"],
        },

        coordinates: {
          lat: pos.lat,
          lng: pos.lng
        }
    }
    ).then(
      this.props.history.push('/')
    )
  }

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Tree Info</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={classes.container}>

              <Input
                onChange={this.handleChange}
                placeholder="Common Name"
                className={classes.input}
                inputProps={{
                  'aria-label': 'CommonName',
                }}
                fullWidth
                name="genericName"
              />
              <Input
                onChange={this.handleChange}
                placeholder="Scientific Name"
                className={classes.input}
                inputProps={{
                  'aria-label': 'ScientificName',
                }}
                fullWidth
                name="scientificName"
              />
              <Input
                onChange={this.handleChange}
                placeholder="Diameter (in inches)"
                className={classes.input}
                inputProps={{
                  'aria-label': 'Diameter',
                }}
                fullWidth
                name="diameter"
              />
              <Input
                onChange={this.handleChange}
                placeholder="Height (in feet)"
                className={classes.input}
                inputProps={{
                  'aria-label': 'Height',
                }}
                fullWidth
                name="height"
              />
              <Input
                onChange={this.handleChange}
                placeholder="Canopy Height (in feet)"
                className={classes.input}
                inputProps={{
                  'aria-label': 'CanopyHeight',
                }}
                fullWidth
                name="canopyHeight"
              />

            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        {/* Health Check Section */}
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Health Checks</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={classes.root}>
              <ListItem button onClick={event => this.handleCheck(event, "fruit")}>
                <Checkbox
                  checked={this.state.fruit}
                />
                <ListItemText primary={`Fruits at the time of survey.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "flower")}>
                <Checkbox
                  checked={this.state.flower}
                />
                <ListItemText primary={`Flowers at the time of initial survey.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "sap")}>
                <Checkbox
                  checked={this.state.sap}
                />
                <ListItemText primary={`Sap oozing out from the tree trunk.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "cutBranches")}>
                <Checkbox
                  checked={this.state.cutBranches}
                />
                <ListItemText primary={`Broken or cut branches.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "branchCrack")}>
                <Checkbox
                  checked={this.state.branchCrack}
                />
                <ListItemText primary={`Holes or cracks in the branches or tree.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "brownmud")}>
                <Checkbox
                  checked={this.state.brownmud}
                />
                <ListItemText primary={`Brown mud like deposit on the tree or the trunk.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "tumours")}>
                <Checkbox
                  checked={this.state.tumours}
                />
                <ListItemText primary={`Tumors, bulges or swellings noticed on the trunk or branches.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "fungus")}>
                <Checkbox
                  checked={this.state.fungus}
                />
                <ListItemText primary={`Fungus visible on the branches or on the trunk.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "wilting")}>
                <Checkbox
                  checked={this.state.wilting}
                />
                <ListItemText primary={`Curling wilting or dis-colourisation notice in the leaves.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "saprophyte")}>
                <Checkbox
                  checked={this.state.saprophyte}
                />
                <ListItemText primary={`Saprophyte or epiphyte growing on the tree.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "fire")}>
                <Checkbox
                  checked={this.state.fire}
                />
                <ListItemText primary={`Signs of fire being burnt near the tree (anywhere under the canopy of the tree).`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "stripped")}>
                <Checkbox
                  checked={this.state.stripped}
                />
                <ListItemText primary={`Outermost layer of the tree trunk stripped.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "construction")}>
                <Checkbox
                  checked={this.state.construction}
                />
                <ListItemText primary={`Perimeter or construction built around the tree.`} />
              </ListItem>
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>


        {/* Environmental Risks Section */}
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Environmental Risks</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={classes.root}>
              <ListItem button onClick={event => this.handleCheck(event, "overgrownBranches")}>
                <Checkbox
                  checked={this.state.overgrownBranches}
                />
                <ListItemText primary={`Overgrown branches close to electric/telephone wires.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "cutTrees")}>
                <Checkbox
                  checked={this.state.cutTrees}
                />
                <ListItemText primary={`Signs of other trees being cut down in the area.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "highway")}>
                <Checkbox
                  checked={this.state.highway}
                />
                <ListItemText primary={`Tree on a highway stretch.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "industrial")}>
                <Checkbox
                  checked={this.state.industrial}
                />
                <ListItemText primary={`Trees located near industrial lands.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "publicLand")}>
                <Checkbox
                  checked={this.state.publicLand}
                />
                <ListItemText primary={`Tree on public land.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "widened")}>
                <Checkbox
                  checked={this.state.widened}
                />
                <ListItemText primary={`Tree on an inner road likely to be widened.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "inhabitedPrivate")}>
                <Checkbox
                  checked={this.state.inhabitedPrivate}
                />
                <ListItemText primary={`Tree in an inhabited private property.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "uninhabitedPrivate")}>
                <Checkbox
                  checked={this.state.uninhabitedPrivate}
                />
                <ListItemText primary={`Tree in an uninhabited private property.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "centerProperty")}>
                <Checkbox
                  checked={this.state.centerProperty}
                />
                <ListItemText primary={`Tree located in the center of the property.`} />
              </ListItem>

              <ListItem button onClick={event => this.handleCheck(event, "perimeterProperty")}>
                <Checkbox
                  checked={this.state.perimeterProperty}
                />
                <ListItemText primary={`Tree located at the perimeter of the property.`} />
              </ListItem>
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel disabled>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Image Upload</Typography>
          </ExpansionPanelSummary>
        </ExpansionPanel>
        <Fab color="primary" aria-label="Save" className={classes.fab} onClick={this.addTree}>
          <CheckIcon />
        </Fab>
      </div>
    );
  }
}



SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(SimpleExpansionPanel);
