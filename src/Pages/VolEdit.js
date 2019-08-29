import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Checkbox, List, ListItem, ListItemText, Fab, Button } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import CommSciMap from './../Components/CommSciMap'
import Resizer from 'react-image-file-resizer'
import ReactGA from 'react-ga'
import GalleryView from '../Components/GalleryView';

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
        console.log(props.location.state)
        this.state = {
            genericName: props.location.state.info.genericName,
            scientificName: props.location.state.info.scientificName,
            diameter: props.location.state.info.diameter,
            height: props.location.state.info.height,
            canopyHeight: props.location.state.info.canopyHeight,
            fruit: props.location.state.info.fruit,
            flower: props.location.state.info.flower,
            sap: props.location.state.healthChecks.sap,
            fungus: props.location.state.healthChecks.fungus,
            saprophyte: props.location.state.healthChecks.saprophyte,
            brownmud: props.location.state.healthChecks.brownmud,
            stripped: props.location.state.healthChecks.stripped,
            wilting: props.location.state.healthChecks.wilting,
            tumours: props.location.state.healthChecks.tumours,
            branchCrack: props.location.state.healthChecks.branchCrack,
            cutBranches: props.location.state.healthChecks.cutBranches,
            construction: props.location.state.healthChecks.construction,
            fire: props.location.state.healthChecks.fire,
            widened: props.location.state.environmentalRisks.widened,
            highway: props.location.state.environmentalRisks.highway,
            publicLand: props.location.state.environmentalRisks.publicLand,
            industrial: props.location.state.environmentalRisks.industrial,
            inhabitedPrivate: props.location.state.environmentalRisks.inhabitedPrivate,
            cutTrees: props.location.state.environmentalRisks.cutTrees,
            perimeterProperty: props.location.state.environmentalRisks.perimeterProperty,
            overgrownBranches: props.location.state.environmentalRisks.overgrownBranches,
            centerProperty: props.location.state.environmentalRisks.centerProperty,
            uninhabitedPrivate: props.location.state.environmentalRisks.uninhabitedPrivate,
            filenames: [],
            downloadURLs: [],
            isUploading: false,
            uploadProgress: 0,
            files: [],
            disableSubmit: true,
            uploadSuccess: false,
            filesToStore: [],
            lat: props.location.state.coordinates.latitude,
            lng: props.location.state.coordinates.longitude
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

        if (event.target.files) {
            uploadFlag = true
            files.forEach(file => {
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

    editTree = () => {

        let db = this.props.location.firebaseApp.firestore()
        let suid = uid.toString()
        console.log(suid, typeof(suid))

        let date= new Date()

        // db.collection('trees_index').doc('mapload').update({
        //     data: firebase.firestore.FieldValue.arrayUnion({ "id": suid, "updated": date})
        // });

        //saves main info on tree
        db.collection('trees').doc(suid).set({
            info: {
                // genericName: this.state.genericName,
                // scientificName: this.state.scientificName, //string,
                // age: null,
                flower: this.state.flower, //true/false,
                fruit: this.state.fruit, //true/false,
                // diameter: this.state.circumference / 3.1415, //num,
                // height: this.state.height, //num,
                // canopyHeight: this.state.canopyHeight, //num,
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
                //createdUser: user.uid,
                //createdTime: this.state.updates.createdTime, //timezone?,
                updatedUser: firebase.auth().currentUser.email,
                updatedAt: new Date(),
            },
            environmentalRisks: {
                overgrownBranches: this.state.overgrownBranches, //t/f,  //Overgrown branches close to electric/telephone wires.
                cutTrees: this.state.cutTrees, //t/f, //Signs of other trees being cut down in the area.
                highway: this.state.highway, //t/f,  //Tree on a highway stretch.
                industrial: this.state.industrial, //t/f,  //Trees located near industrial lands.
                publicLand: this.state.publicLand, //t/f, //Tree on public land.
                widened: this.state.widened,//t/f, //Tree on an inner road likely to be widened.
                inhabitedPrivate: this.state.inhabitedPrivate, //t/f,  //Tree in an inhabited private property.
                uninhabitedPrivate: this.state.uninhabitedPrivate, //t/f,  //Tree in an habited private property.
                centerProperty: this.state.centerProperty, //t/f,  //Tree located in the center of the property
                perimeterProperty: this.state.perimeterProperty //t/f, //Tree located at the perimeter of the property.
            }//,
            // coordinates: {
            //     lat: this.state.lat,
            //     lng: this.state.lng
            // },
            // images: this.state.downloadURLs
        },
        {
            merge: true
        }
        ).then(
            console.log("Success", uid),
            ReactGA.event({
                category: 'User',
                action: 'Tree Edited'
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
        console.log(this.props)

    }

    render() {

        const { classes } = this.props;
        uid = this.props.location.state.info.otmId
        console.log(uid)
        console.log(this.state)

        return (
            <div className={classes.root}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Tree Info</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className={classes.container}>
                            <ListItem >
                                <ListItemText
                                    primary="Generic Name"
                                    secondary={this.state.genericName}
                                />
                            </ListItem>
                            <ListItem >
                                <ListItemText
                                    primary="Scientific Name"
                                    secondary={this.state.scientificName}
                                />
                            </ListItem>
                            <ListItem >
                                <ListItemText
                                    primary="Diameter"
                                    secondary={this.state.diameter + ' in'}
                                />
                            </ListItem>
                            <ListItem >
                                <ListItemText
                                    primary="Circumference"
                                    secondary={this.state.diameter ? this.state.diameter * 2 * 3.1415 + ' in' : ' in'}
                                />
                            </ListItem>
                            <ListItem >
                                <ListItemText
                                    primary="Height"
                                    secondary={this.state.height + ' ft'}
                                />
                            </ListItem>
                            <ListItem >
                                <ListItemText
                                    primary="Canopy Height"
                                    secondary={this.state.canopyHeight + ' ft'}
                                />
                            </ListItem>
                            {this.state.images ? <GalleryView img={this.state.images} /> : null}
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
                {/* <ExpansionPanel>
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
                </ExpansionPanel> */}
                <Fab color="primary" aria-label="Save" className={classes.fab} onClick={this.editTree}>
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