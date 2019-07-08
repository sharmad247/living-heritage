import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AutoSuggest from '../Components/FieldAutosuggest'
import Input from '@material-ui/core/Input'
import { Checkbox, List, ListItem, ListItemText, Fab, Button } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import uuidv1 from 'uuid/v1'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import CommSciMap from './../Components/CommSciMap'
import Gallery from './../Components/Gallery'
import FileUploader from 'react-firebase-file-uploader'
import Progress from '../Components/Progress'
import Snackbar from '../Components/Snackbar'
import Resizer from 'react-image-file-resizer'
import ReactGA from 'react-ga'

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
    margin: theme.spacing.unit
  },
  fab: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: 47,
    right: 21,
  }
});

let SciName, uploadFlag = false, uid

class SimpleExpansionPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genericName: '',
      scientificName: '',
      diameter: null,
      height: '',
      canopyHeight: '',
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
      uninhabitedPrivate: false,
      filenames: [],
      downloadURLs: [],
      isUploading: false,
      uploadProgress: 0,
      files: [],
      disableSubmit: true,
      uploadSuccess: false,
      filesToStore: []
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
        [name]: false
      });
  }

  handlePreview = (event) => {
    ReactGA.event({
      category: 'User',
      action: 'Images Selected'
    });
    const files = Object.keys(event.target.files).map(function (_) { return event.target.files[_]; })
    let filesToStore = []

    if (event.target.files)
    {
      uploadFlag = true
      files.forEach(file=>{
        Resizer.imageFileResizer(
          file,
          800,
          800,
          'PNG',
          100,
          0,
          blob => {
            filesToStore.push(blob)
          },
          'blob'
        );
      })
      this.setState({
        filesToStore: filesToStore,
        files: files
      });
    }
    else
      uploadFlag = false
  }

  startUploadManually = () => {
    this.gaEvent()
    const { filesToStore } = this.state;
    this.handleUploadStart()
    console.log(uid)
    filesToStore.forEach(file => {
      this.fileUploader.startUpload(file)
    });
  }

  handleUploadSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref("tree_images/" + uid)
      .child(filename)
      .getDownloadURL();

    this.setState(oldState => ({
      filenames: [...oldState.filenames, filename],
      downloadURLs: [...oldState.downloadURLs, downloadURL],
      uploadProgress: 100,
      isUploading: false,
      disableSubmit: false,
      uploadSuccess: true
    }));
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => { this.setState({ progress }) }
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  gaEvent = () => {
    ReactGA.event({
      category: 'User',
      action: 'Upload - Add Tree'
    });
  } 

  addTree = () => {
    let pos = this.props.location.position

    let db = this.props.location.firebaseApp.firestore()

    //Saves tree UID and coordinates in the index
    db.collection('tree_index').doc('mapload').update({
      data: firebase.firestore.FieldValue.arrayUnion({ "id": uid, "pos": { "lat": pos.lat, "long": pos.lng }, "img": this.state.downloadURLs[0] })
    });

    //saves main info on tree
    db.collection('tree_data').doc(uid).set({
      info: {
        genericName: this.state.genericName,
        scientificName: this.state.scientificName, //string,
        // age: null,
        flower: this.state.flower, //true/false,
        fruit: this.state.fruit, //true/false,
        diameter: this.state.circumference / 3.1415, //num,
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
        //createdUser: //UUID,
        //createdTime = new Date(), //timezone?,
        //updatedUser : tree["Updated By"],
        //updatedAt : tree["Updated At"],
      },
      environmentalRisks: {
        overgrownBranches: this.state.overgrownBranches, //t/f,  //Overgrown branches close to electric/telephone wires.
        cutTrees: this.state.cutBranches, //t/f, //Signs of other trees being cut down in the area.
        highway: this.state.highway, //t/f,  //Tree on a highway stretch.
        industrial: this.state.industrial, //t/f,  //Trees located near industrial lands.
        publicLand: this.state.publicLand, //t/f, //Tree on public land.
        widened: this.state.widened,//t/f, //Tree on an inner road likely to be widened.
        inhabitedPrivate: this.state.inhabitedPrivate, //t/f,  //Tree in an inhabited private property.
        uninhabitedPrivate: this.state.uninhabitedPrivate, //t/f,  //Tree in an habited private property.
        centerProperty: this.state.centerProperty, //t/f,  //Tree located in the center of the property
        perimeterProperty: this.state.perimeterProperty //t/f, //Tree located at the perimeter of the property.
      },
      coordinates: {
        lat: pos.lat,
        lng: pos.lng
      },
      images: this.state.downloadURLs
    }
    ).then(
      console.log(uid),
      ReactGA.event({
        category: 'User',
        action: 'Tree Added'
      }),
      this.props.history.push('/')
    )
  }

  nameCallback = (CommonName) => {
    this.setState({ genericName: CommonName })
    CommonName = CommonName.replace(/ +/g, "")
    SciName = CommSciMap[CommonName]
    this.setState({ scientificName: SciName })
  }

  componentDidMount() {
    uid = uuidv1()
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
              <AutoSuggest nameCallback={this.nameCallback} />
              <Input
                onChange={this.handleChange}
                placeholder="Scientific Name"
                className={classes.input}
                inputProps={{
                  'aria-label': 'ScientificName',
                }}
                fullWidth
                name="scientificName"
                value={this.state.scientificName}
                required
              />
              <Input
                onChange={this.handleChange}
                placeholder="Circumference (in inches)"
                className={classes.input}
                inputProps={{
                  'aria-label': 'Circumference',
                }}
                fullWidth
                name="circumference"
              />
              <Input
                onChange={this.handleChange}
                placeholder="0 in"
                className={classes.input}
                inputProps={{
                  'aria-label': 'Diameter',
                }}
                fullWidth
                name="diameter"
                disabled
                value={!this.state.circumference ? "Diameter" : (this.state.circumference / 3.1415).toFixed(2) + " in"}
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


        {/* Image Upload Section */}
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Image Upload</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FileUploader
              accept="image/*"
              name="image-uploader-multiple"
              randomizeFilename
              storageRef={firebase.storage().ref("tree_images/" + uid)}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
              multiple
              onChange={this.handlePreview}
              ref={instance => { this.fileUploader = instance; }}
            />
            <label>
              <Button onClick={this.startUploadManually} variant="contained" component="span" disabled={!uploadFlag} className={classes.button}>
                Upload
              </Button>
            </label>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <p></p>
            {this.state.files[0] ? <Gallery img={this.state.files} /> : null}
          </ExpansionPanelDetails>
          {this.state.isUploading && <Progress />}
          {this.state.uploadSuccess && <Snackbar />}

          <br />
        </ExpansionPanel>
        <Fab disabled={this.state.disableSubmit} color="primary" aria-label="Save" className={classes.fab} onClick={this.addTree}>
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